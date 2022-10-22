// @ts-nocheck
import { VMessTools } from '@kyuuseiryuu/v2ray-tools'
import shape from 'shape-json'

const VmessSchema = {
  name: 'ps',
  server: 'add',
  server_port: 'port',
  uuid: 'id',
  security: 'scy',
  alter_id: 'aid',
  tls: {
    enabled: false,
    server_name: 'sni',
  },
  transport: {
    type: 'net',
    host: 'host',
    path: 'path',
  },
}

export const parseVmess = (str: string): Partial<typeof VmessSchema> => {
  let obj
  if (VMessTools.isVMessLinkV1(str)) obj = VMessTools.parseV1Link(str)
  if (VMessTools.isVMessLinkV2(str)) obj = VMessTools.parseV2Link(str)
  if (!obj) return null
  const vmessObj = shape.parse(obj, VmessSchema)
  if (obj?.tls) vmessObj.tls.enabled = true
  else delete vmessObj.tls
  vmessObj.transport.host = [vmessObj.transport.host]
  if (vmessObj.transport.type.toLowerCase() !== 'http') delete vmessObj.transport.host
  vmessObj.server_port = parseInt(vmessObj.server_port)
  vmessObj.alter_id = parseInt(vmessObj.alter_id)
  return vmessObj
}
