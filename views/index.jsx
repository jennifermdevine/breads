const React = require('react');

const Default = require('./layout/default')

function Index({breads, title}){
    return(
        <Default title={title}>
            <h2>Index Page</h2>
            <ul>
                {
                    breads.map((bread, index)=> {
                        return (
                            <li key={index}>
                                <a href={`/breads/${bread.id}`}>
                                {bread.name}
                                </a>
                            </li>
                            
                            
                        )
                    })
    }

            </ul>
            <div className="newButton">
                                <a href="/breads/new"><button>Add a new bread</button></a>
                            </div>
            {/* <p>I have {breads[3].name} bread</p> */}
        </Default>
    )
}

module.exports = Index