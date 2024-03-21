export function useHelloWorld() {

  const msg: Ref<string> = ref('Hello World!')

  return 'Hello World';
}