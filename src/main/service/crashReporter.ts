import { crashReporter } from 'electron'
import { config } from '@main/global/config'

export const initCrashReporter = () => {
  // 判断是否上传
  let uploadToServer = config.isUploadCrashReportToServer
    ? config.CrashReportURL
      ? true
      : false
    : false
  crashReporter.start({
    uploadToServer,
    submitURL: config.CrashReportURL,
    productName: config.APP_NAME,
    globalExtra: {
      companyName: config.COMPANY_NAME
    }
  })
}
