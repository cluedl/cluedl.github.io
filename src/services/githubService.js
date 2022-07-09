class GithubService {
    constructor() {
        this.baseAddress = `https://api.github.com/repos/cluedl/cluedl.github.io`
        this.authHeader = 'token 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'
    }
    async uploadFile(path, rawContent) {
        const sha = await this.#getSha(path)

        const encryptedContent = btoa(rawContent)

        const bodyStr = JSON.stringify(
            {
                "message":".",
                "committer":{
                    "name":"Guapo",
                    "email":"el@guapo.com"
                },
                "content":encryptedContent,
                "sha":sha
            }            
        )

        const fetchOptions = {
            method: 'PUT',
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": this.authHeader,
                "Content-Type": "application/json"
            },
            body: bodyStr
        }

        await fetch(`${this.baseAddress}/contents/${path}`, fetchOptions)
    }
    async #getSha(path) {
        const res = await fetch(`${this.baseAddress}/contents/${path}`)
        const json = await res.json()
        return json.sha
    }
}

export default new GithubService()