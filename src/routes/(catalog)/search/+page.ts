import { ProductService } from '$lib/services'

export const prerender = false

export async function load({ url, parent }) {
	const { store, storeId, origin, sid } = await parent()
	const currentPage = +url.searchParams.get('page') || 1
	const fl = {}
	const query = url.searchParams || []
	const searchData = url.searchParams.get('q')
	const sort = url.searchParams.get('sort')

	for (const [key, value] of query.entries()) {
		fl[key] = value
	}

	let products: any = {}

	try {
		products = await ProductService.fetchProducts({
			query: query.toString(),
			storeId,
			origin,
			sid
		})
	} catch (e) {
		console.log(e)
	}

	return {
		products,
		query: query.toString(),
		searchData,
		sort,
		store,
		currentPage
	}
}
