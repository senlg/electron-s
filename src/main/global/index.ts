import { PrismaClient } from '@prisma/client'
import { ViewManager } from './viewManager'

export const GlobalObject: {
  window: Electron.BrowserWindow | null
  db: PrismaClient | null
  viewManager: ViewManager | null
} = {
  window: null,
  db: null,
  viewManager: new ViewManager()
}
