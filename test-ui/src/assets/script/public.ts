import router from '@/router';
//定义跳转函数根据路由name进行跳转
export const redirectToRoute = (routeName: string) =>{
  const route = router.options.routes.find(r => r.name === routeName);
  if (route) {
    router.push({ name: route.name });
  } else {
    console.error(`Route with name "${routeName}" not found.`);
  }
}