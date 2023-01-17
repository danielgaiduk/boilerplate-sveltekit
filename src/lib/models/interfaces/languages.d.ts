interface IUrlFragments {
	locale: string
	location: string
	isValid: boolean
}

interface IUrlCollection {
	isDefault: boolean
	locale: string
	url: string
}

export { IUrlFragments, IUrlCollection }
