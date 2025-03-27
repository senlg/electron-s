import { PrismaClient } from '@prisma/client'
import { ViewManager } from '../service/viewManager'
import { Low } from 'lowdb/lib'
import { Tray } from 'electron'

export const GlobalObj: {
  window: Electron.BrowserWindow | null
  db: PrismaClient | null | Low
  viewManager: ViewManager | null
  tray: Tray | null
} = {
  window: null,
  db: null,
  viewManager: null,
  tray: null
}
