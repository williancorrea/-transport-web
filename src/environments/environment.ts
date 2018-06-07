// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --variaveisAmbiente=prod` then `environment.prod.ts` will be used instead.
// The estadoCivilList of which variaveisAmbiente maps to which file can be found in `.angular-cli.json`.

export const environment = {
   production: false,
   apiUrl: 'http://localhost:8080',

   dataTable: {
      filterDelay: 500,
      rows: 10,
      rowsPerPageOptions: [5, 10, 20]
   }
};
