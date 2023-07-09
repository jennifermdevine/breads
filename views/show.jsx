const React = require('react')
const Default = require('./layout/default')

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
        <li><a href="/breads">Go home</a></li>
      </Default>
      
    )
}

module.exports = Show