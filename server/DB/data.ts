export default {
    get urls(){
        return _urls
    },
    set urls(data: any) {
        new Error('Object urls has read only permissions')
    }
}

const _urls =  [
    {
        "id": "DP1L1",
        "title": "Nodejs: Hello world",
        "description": "How to build simple Nodejs application.",
        "url": "https://github.com/voloshyndmitry/cim-school/tree/master/examples/nodejs-l1"
    },
    {
        "id": "DP2L1",
        "title": "GIT: Part 1-2",
        "description": "How to use Git?",
        "url": "https://github.com/voloshyndmitry/cim-school/tree/master/examples/git-l1"
    },
    {
        "id": "LP1L1",
        "title": "Nodejs: Hello world",
        "description": "How to build simple Nodejs application.",
        "url": "https://github.com/voloshyndmitry/code-is-magic/"
    },
    {
        "id": "MP1L1",
        "title": "Nodejs: Hello world",
        "description": "How to build simple Nodejs application.",
        "url": "https://github.com/voloshyndmitry/code-is-magic/"
    },{
        "id": "DP3L1",
        "title": "ReactJS: first project",
        "description": "How to build your first react app.",
        "url": "https://github.com/voloshyndmitry/cim-school/tree/master/examples/first-react-app/"
    },
]