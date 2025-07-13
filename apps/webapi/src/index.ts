import { Hono } from 'hono'
import { auth } from './lib/auth'
import { cors } from "hono/cors";
import { betterAuth } from 'better-auth';

type AuthInstance = ReturnType<typeof betterAuth>;

const app = new Hono<{
  Bindings: CloudflareBindings,
  Variables : {
		user: AuthInstance['$Infer']['Session']['user'] | null;
		session: AuthInstance['$Infer']['Session']['session'] | null
	}
}>()

app.use("*", async (c, next) => {
	const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers });
 
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	return next();
  	}
 
  	c.set("user", session.user);
  	c.set("session", session.session);
  	return next();
});

app.get("/session", (c) => {
	const session = c.get("session")
	const user = c.get("user")
	
	if(!user) return c.body("Unauthorized", 401);
 
  	return c.json({
	  session,
	  user
	});
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.on(["POST", "GET"], "/api/*", (c) => {
	return auth(c.env).handler(c.req.raw);
});

 
app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	(c, next) => {
		const corsMiddleware = cors({
			origin: c.env.BETTER_AUTH_URL,
			allowHeaders: ["Content-Type", "Authorization"],
			allowMethods: ["POST", "GET", "OPTIONS"],
			exposeHeaders: ["Content-Length"],
			maxAge: 600,
			credentials: true,
		});
		return corsMiddleware(c, next);
	}
);

export default app
