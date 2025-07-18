/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as UsersRouteImport } from './routes/users'
import { Route as AboutRouteImport } from './routes/about'
import { Route as PathlessLayoutRouteImport } from './routes/_pathlessLayout'
import { Route as IndexRouteImport } from './routes/index'

const UsersRoute = UsersRouteImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => rootRouteImport,
} as any)
const AboutRoute = AboutRouteImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRouteImport,
} as any)
const PathlessLayoutRoute = PathlessLayoutRouteImport.update({
  id: '/_pathlessLayout',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/users': typeof UsersRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/users': typeof UsersRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_pathlessLayout': typeof PathlessLayoutRoute
  '/about': typeof AboutRoute
  '/users': typeof UsersRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/users'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/users'
  id: '__root__' | '/' | '/_pathlessLayout' | '/about' | '/users'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PathlessLayoutRoute: typeof PathlessLayoutRoute
  AboutRoute: typeof AboutRoute
  UsersRoute: typeof UsersRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/users': {
      id: '/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_pathlessLayout': {
      id: '/_pathlessLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PathlessLayoutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PathlessLayoutRoute: PathlessLayoutRoute,
  AboutRoute: AboutRoute,
  UsersRoute: UsersRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
