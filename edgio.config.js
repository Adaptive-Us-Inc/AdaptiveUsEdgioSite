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

  origins: [
    {
      name: "web",
      hosts: [
        {
          location: "7768311.group11.sites.hubspot.net"
        }
      ],
      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: "www.adaptiveus.com"
      },
      override_host_header: "www.adaptiveus.com"
    },
    {
      name: "cdn",
      override_host_header: "7768311.fs1.hubspotusercontent-na1.net",
      hosts: [
        {
          location: "7768311.fs1.hubspotusercontent-na1.net",
        },
      ],

      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: "7768311.fs1.hubspotusercontent-na1.net",
      },
    },
  ],

  environments: {
    production: {
      hostnames: [
        { hostname: "www.adaptiveus.com", default_origin_name: "web" }
      ]
    }
  }
};
