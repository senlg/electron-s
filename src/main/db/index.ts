import { GlobalObject } from '../global'
import { ViewManager } from '../service/viewManager'

export const initDb = () => {
  GlobalObject.viewManager ??= new ViewManager()
}
