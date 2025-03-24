import { PrismaClient } from '@prisma/client'
import { ViewManager } from '../service/viewManager'

export const GlobalObject: {
  window: Electron.BrowserWindow | null
  db: PrismaClient | null
  viewManager: ViewManager | null
} = {
  window: null,
  db: null,
  viewManager: null
}
