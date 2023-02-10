const GET = async () => {
	const text = `
        User-agent: *
        Allow: /
    `

	return new Response(String(text))
}

export { GET }
