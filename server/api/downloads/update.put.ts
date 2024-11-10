export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event);
    const id = query.id;

    const res = await $fetch(config.update, {
        method: 'PUT',
        headers: {
            accept: 'application/json'
        },
        params: {
            id: id
        }
    });
    return res
});