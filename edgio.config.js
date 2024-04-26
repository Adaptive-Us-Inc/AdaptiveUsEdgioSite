// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/guides/edgio_config
module.exports = {
  //Connector for browser and service worker files
  connector: '@edgio/starter',

  // The name of the site in Edgio to which this app should be deployed.
  name: "adaptiveus-main-site",

  // The name of the team in Edgio to which this app should be deployed.
  team: 'adaptive-us',

  // Overrides the default path to the routes file. The path should be relative to the root of your app.
  // routes: 'routes.js',

  // origins: [
  //   {
  //     name: "web",
  //     hosts: [
  //       {
  //         location: "7768311.group11.sites.hubspot.net"
  //       }
  //     ],
  //     tls_verify: {
  //       use_sni: true,
  //       sni_hint_and_strict_san_check: "www.adaptiveus.com"
  //     },
  //     override_host_header: "www.adaptiveus.com"
  //   },
  //   {
  //     name: "cdn",
  //     override_host_header: "7768311.fs1.hubspotusercontent-na1.net",
  //     hosts: [
  //       {
  //         location: "7768311.fs1.hubspotusercontent-na1.net",
  //       },
  //     ],

  //     tls_verify: {
  //       use_sni: true,
  //       sni_hint_and_strict_san_check: "7768311.fs1.hubspotusercontent-na1.net",
  //     },
  //     // shields: { us_east: 'DCD' },
  //   },
  // ],
  origins: [
    {
      // The name of the backend origin
      name: "temp",

      // Use the following to override the host header sent from the browser when connecting to the origin
      override_host_header: "httpbin.org",

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: "httpbin.org",
        },
      ],

      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: "httpbin.org",
      },

      // Uncomment the following to configure a shield
      // shields: { us_east: 'DCD' },
    },
  ],

};
