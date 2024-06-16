
const allRoutesModules = import.meta.glob(['./**/*.ts', '!./index.ts'], { eager: true });

let routes: any[] = [];

for (const path in allRoutesModules) {
    const module: any = allRoutesModules[path];
    const data = module.default;

    //console.log(path, data)

    if (Array.isArray(data)) {
        routes.push(...data);
    } else {
        routes.push(data);
    }
}

export default routes;
