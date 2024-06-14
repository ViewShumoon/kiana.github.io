
const allRoutesModules = import.meta.glob(['./**/*.ts', '!./index.ts'], { eager: true });

//const routes = Object.keys(allRoutesModules).reduce((const result : any, path) => {
//     // 导出的对象中有一个属性：default，可以获取到默认导出的所有内容
//     const module : any = allRoutesModules[path];
//     const value = module.default;

//     console.log(path, value)

//     // 我们判断导出的是不是数组，是则进行拓展解构
//     if (Array.isArray(value)) {
//         routes.push(...value);
//     } else {
//         // 否则直接加到routes中
//         routes.push(value);
//     }
//     return routes;
// }, 
// []);
let routes: any[] = [];
Object.keys(allRoutesModules).map((path) => {
    // 导出的对象中有一个属性：default，可以获取到默认导出的所有内容
    const module: any = allRoutesModules[path];
    const data = module.default;

    //console.log(path, data)

    if (Array.isArray(data)) {
        routes.push(...data);
    } else {
        routes.push(data);
    }
    return routes;
});

export default routes;
