const allRoutesModules = import.meta.glob(['./**/*.ts', '!./index.ts'], { eager: true });

let routes: any[] = [];
let allSubRoutes: { parentPath: string, subRoutes: any[] }[] = [];

for (const path in allRoutesModules) {
    const module: any = allRoutesModules[path];
    const data = module.default;

    var slashIndex = path.indexOf('/', 3);
    if (slashIndex > 0) {
        const parentPath = path.substring(2, slashIndex);
        if (Array.isArray(data)) {
            allSubRoutes.push({ parentPath, subRoutes: [...data] });
        } else {
            allSubRoutes.push({ parentPath, subRoutes: [data] });
        }
        continue;
    }

    if (Array.isArray(data)) {
        routes.push(...data);
    } else {
        routes.push(data);
    }
}

// 将子路由挂到父路由
for (const { parentPath, subRoutes } of allSubRoutes) {
    const parent = routes.find(r => r.name && r.name.toLowerCase() === parentPath.toLowerCase());
    if (parent) {
        if (!parent.children) 
            parent.children = [];
        parent.children.push(...subRoutes);
    } else {
        // 没有父路由则直接加入 routes
        routes.push(...subRoutes);
    }
}

console.log(routes);

export default routes;
