'use strict';

const spawnSync = require('child_process').spawnSync;

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.commands = {
      syncToS3: {
        usage: 'Deploys the `app` directory to your bucket',
        lifecycleEvents: [
          'sync',
        ],
      },
      bucketInfo: {
        usage: 'Fetches and prints out the deployed CloudFront bucket names',
        lifecycleEvents: [
          'bucketInfo',
        ],
      },
      domainInfo: {
        usage: 'Fetches and prints out the deployed CloudFront domain names',
        lifecycleEvents: [
          'domainInfo',
        ],
      },
      purgeCache: {
          usage: 'Purge CloudFront distribution',
          lifecycleEvents: [
              'purgeCache',
          ],
      },
    };

    this.hooks = {
      'syncToS3:sync': this.syncDirectory.bind(this),
      'domainInfo:domainInfo': this.domainInfo.bind(this),
      'bucketInfo:bucketInfo': this.bucketInfo.bind(this),
      'purgeCache:purgeCache': this.purgeCache.bind(this),
    };
  }

  getDescribeStacksOutput(outputKey) {
    const provider = this.serverless.getProvider('aws');
    const stackName = provider.naming.getStackName(this.options.stage);
    return provider
      .request(
        'CloudFormation',
        'describeStacks',
        { StackName: stackName },
        this.options.stage,
        this.options.region // eslint-disable-line comma-dangle
      )
      .then((result) => {
        const outputs = result.Stacks[0].Outputs;
        const output = outputs.find(entry => entry.OutputKey === outputKey);
        return output.OutputValue;
      });
  }

  // syncs the `app` directory to the provided bucket
  syncDirectory() {
    const s3LocalPath = this.serverless.service.custom.s3LocalPath;
    const args = [
      's3',
      'sync',
      s3LocalPath,
      `s3://${this.serverless.service.custom.s3Bucket}`,
    ];
    this.serverless.cli.log(`Syncing directory ${s3LocalPath} with bucket s3://${this.serverless.service.custom.s3Bucket}`);
    const result = spawnSync('aws', args);
    const stdout = result && result.stdout && result.stdout.toString();
    const stderr = result && result.stderr && result.stderr.toString();
    this.serverless.cli.log(`stdout:\n${stdout}`);
    this.serverless.cli.log(`stderr:\n${stderr}`);
    if (!stderr) {
      this.serverless.cli.log('Successfully synced to the S3 bucket');
    }
  }

  // fetches the bucket name from the CloudFront outputs and prints it out
  bucketInfo() {
    this.getDescribeStacksOutput('WebAppS3BucketOutput').then(outputValue =>
      this.serverless.cli.log(`Web App Bucket: ${outputValue || 'Not Found'}`)
    );
  }

  // fetches the domain name from the CloudFront outputs and prints it out
  domainInfo() {
    this.getDescribeStacksOutput('WebAppCloudFrontDistributionOutput').then(outputValue =>
      this.serverless.cli.log(`Web App Domain: ${outputValue || 'Not Found'}`)
    );
  }

  purgeCache() {
    const provider = this.serverless.getProvider('aws');
    const stackName = provider.naming.getStackName(this.options.stage);
    return provider
        .request(
            'CloudFormation',
            'describeStacks',
            { StackName: stackName },
            this.options.stage,
            this.options.region // eslint-disable-line comma-dangle
        )
        .then((result) => {
          const outputs = result.Stacks[0].Outputs;
          const output = outputs.find(entry => entry.OutputKey === 'WebAppCloudFrontDistributionIdOutput');
          if (output.OutputValue) {
            const args = [
              'cloudfront',
              'create-invalidation',
              '--distribution-id',
              output.OutputValue,
              '--paths',
              '/*',
            ];

            const result = spawnSync('aws', args);
            const stdout = result.stdout.toString();
            const sterr = result.stderr.toString();
            if (stdout) {
              this.serverless.cli.log(stdout);
            }
            if (sterr) {
              this.serverless.cli.log(sterr);
            }
            if (!sterr) {
              this.serverless.cli.log('Successfully created invalidation request');
            }
          } else {
            this.serverless.cli.log('Distribution Not Found');
          }
        });
  }
}

module.exports = ServerlessPlugin;
