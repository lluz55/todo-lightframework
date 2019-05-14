import { lf, observable } from "@lluz55/lightframework";

// Todo component
const todoComp = (todo, removeTodo, todos) => {
  // Creates new observable and set it to receive the current checked status from current todo
  let checkedClass = observable(todo.checked ? 'item-checked' : 'text-decoration: none')
  // Creates new observable for remove button be visible or not
  let removeBtn = observable('display: none')

  // Register the check action whene user mark/unmark a todo
  function check(e) {
    let checked = e.target.checked
    // Set currnt todo object to checkbox state
    todo.checked = checked

    //TODO: use some kind of STORE for better data saving
    // Saves to localStorage 
    localStorage.setItem('todos', JSON.stringify(todos))
    // Set checked class to show marked or not
    checkedClass.setValue(checked ? 'item-checked' : '')
  }

  // Run when the DOM element has being created to set checked value
  function onInitCheck(e) {
    e.checked = todo.checked
  }

  return (
    <li class="item" onmouseenter={() => removeBtn.setValue('display: block')}
      onmouseleave={() => removeBtn.setValue('display: none')}
    >
      <label class={checkedClass} onclick={(e) => check(e)}>
        <input type="checkbox" oncreate={onInitCheck} oninput={(e) => check(e)} />
        <div>{todo.description}</div>
        <span class="checkmark"></span>
      </label>
      <button style={removeBtn} onclick={() => removeTodo(todo)}>x</button>
    </li>
  )
}

export { todoComp }