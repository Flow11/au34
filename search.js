(() => {
  'use strict'

  const $ = selector => document.querySelector(selector)
  const $$ = selector => document.querySelectorAll(selector)
  const $select = $('select')
  const optgroup = document.createElement('optgroup')
  const rooms = Array.from($$('path'))
    .filter(room => room.id.includes('e3-'))
    .sort((a, b) => a.id > b.id)
  const highlight = event => {
    rooms.forEach(room => room.classList.remove('highlight'))

    $(`#${event.target.value}`).classList.add('highlight')
  }
  const createOptions = room => {
    const option = document.createElement('option')
    const textNode = document.createTextNode(room.querySelector('title').textContent)

    option.value = room.id
    option.appendChild(textNode)
    optgroup.setAttribute('label', room.querySelector('desc').textContent)
    optgroup.appendChild(option)
  }

  rooms.forEach(createOptions)
  $('select').appendChild(optgroup)

  $select.addEventListener('change', highlight)
})()
