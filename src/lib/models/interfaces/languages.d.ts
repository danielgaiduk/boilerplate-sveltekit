interface IUrlFragments {
	locale: string
	location: string
	error: boolean
}

interface IUrlCollection {
	isDefault: boolean
	locale: string
	url: string
}

export { IUrlFragments, IUrlCollection }
