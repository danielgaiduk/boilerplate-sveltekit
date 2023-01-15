interface IURLFragments {
	locale: string
	location: string
	isValid: boolean
}

interface IUrlCollection {
	isDefault: boolean
	locale: string
	url: string
}

export { IURLFragments, IUrlCollection }
