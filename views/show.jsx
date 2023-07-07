const React = require('react')
const Default = require('./layout/Default')

function Show ({bread, bakersOtherBreads}) {
  console.log(bread)
    return (
        <Default title={bread.name}>
        <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
          <input type='submit' value="DELETE"/>
        </form>
        <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
        <h3>Name: {bread.name}</h3>
        <p>
          and it
          {
            bread.hasGluten
            ? <span> does </span>
            : <span> does NOT </span>
          }
          have gluten.
        </p>
        <img src={bread.image} alt={bread.name} />
        <p>{bread.getBakedBy()}</p>
        <div>
          {!bakersOtherBreads.length ? 
          <div>{bread.baker} doesn't have other 😥 </div> : 
          (<div>
            <p>{bread.baker}'s other breads: </p>
            <ul>
            {bakersOtherBreads.map(bread => (
              <li>
                <a href={`/breads/${bread.id}`}>
                {bread.name}
                </a>
              </li>
              ))}
            </ul>
          </div>)}
          {}
        </div>
        <li><a href="/breads">Go home</a></li>
      </Default>
      
    )
}

module.exports = Show