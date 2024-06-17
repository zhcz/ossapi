require('dotenv').config();
'use strict';
// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const Sts20150401 = require('@alicloud/sts20150401');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const Tea = require('@alicloud/tea-typescript');
const crypto = require('crypto');
const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
console.log("Access Key ID:", accessKeyId);
console.log("Access Key Secret:", accessKeySecret);
class Client {                                      
  /**
   * 使用AK&SK初始化账号Client
   * @return Client
   * @throws Exception
   */
  static createClient() {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: accessKeyId,
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: accessKeySecret,
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Sts
    config.endpoint = `sts.cn-beijing.aliyuncs.com`;
    return new Sts20150401.default(config);
  }
  static async main(args) {
    let client = Client.createClient();
    let assumeRoleRequest = new Sts20150401.AssumeRoleRequest({
      durationSeconds: 3600,
      policy: '{"Statement": [{"Action": ["*"],"Effect": "Allow","Resource": ["*"]}],"Version":"1"}',
      roleArn: 'acs:ram::1579814527103180:role/ramosstest',
      roleSessionName: 'alice',
      externalId: 'abcd1234',
    });
    let runtime = new Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      await client.assumeRoleWithOptions(assumeRoleRequest, runtime);
      const response = await client.assumeRoleWithOptions(assumeRoleRequest, runtime);
      console.log(response);
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error.data["Recommend"]);
      Util.default.assertAsString(error.message);
    }    
  }
}
exports.Client = Client;
Client.main(process.argv.slice(2));


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

async function getAssumeRoleResponse(assumeRoleRequest, runtime) {
  const client = Client.createClient();
  return await client.assumeRoleWithOptions(assumeRoleRequest, runtime);
}

app.post('/api/result', async (req, res) => {
  const assumeRoleRequest = new Sts20150401.AssumeRoleRequest({
    durationSeconds: 3600,
    policy: '{"Statement": [{"Action": ["*"],"Effect": "Allow","Resource": ["*"]}],"Version":"1"}',
    roleArn: 'acs:ram::1579814527103180:role/ramosstest',
    roleSessionName: 'alice',
    externalId: 'abcd1234',
  });
  const runtime = new Util.RuntimeOptions({ });

  try {
    const response = await getAssumeRoleResponse(assumeRoleRequest, runtime);
    console.log('Received response:', response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;