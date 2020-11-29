import { Command, flags } from '@oclif/command';
import { Input } from '@oclif/command/lib/flags';
import { get } from '~/actions';

export default class Get extends Command {
  static description = 'get rancher proxy';

  static examples = ['$ rancher-proxy get some-service'];

  static flags: Input<any> = {
    'cluster-id': flags.string({ char: 'c', required: false }),
    'no-fail': flags.boolean({ required: false }),
    'rancher-url': flags.string({ char: 'u', required: false }),
    namespace: flags.string({ char: 'n', required: false }),
    port: flags.string({ char: 'p', required: false })
  };

  static strict = false;

  static args = [{ name: 'SERVICE', required: true }];

  async run() {
    const { flags, args } = this.parse(Get);
    const url = await get({
      clusterId: flags['cluster-id'],
      noFail: flags['no-fail'],
      ns: flags.namespace,
      port: flags.port,
      rancherUrl: flags['rancher-url'],
      serviceName: args.SERVICE
    });
    console.log(url || '');
  }
}
