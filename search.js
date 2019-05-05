(() => {
  'use strict'

  const $ = selector => document.querySelector(selector)
  const $$ = selector => document.querySelectorAll(selector)
  const $search = $('.search')
  const $select = $('select')
  const optgroup = document.createElement('optgroup')

  const sortByAlpha = (a, b) => {
    const valueA = a.querySelector('title').textContent
    const valueB = b.querySelector('title').textContent

    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
  }

  const rooms = Array.from($$('path'))
    .filter(room => room.id.includes('e3-'))
    .sort(sortByAlpha)

  const createOption = room => {
    const option = document.createElement('option')
    const textNode = document.createTextNode(room.querySelector('title').textContent)

    option.value = room.id
    option.appendChild(textNode)
    optgroup.setAttribute('label', room.querySelector('desc').textContent)
    optgroup.appendChild(option)
  }

  const toggleRooms = event => room => {
    room.id.includes(event.currentTarget.value) ?
      room.classList.add('highlight') : room.classList.remove('highlight')
  }

  const highlightRoom = event => {
    rooms.forEach(toggleRooms(event))
  }

  const toggleOptions = event => option => {
    option.textContent.toLowerCase().includes(event.currentTarget.value.toLowerCase()) ?
      option.classList.remove('hidden') : option.classList.add('hidden')
  }

  const reduce = event => {
    Array.from($select.options).forEach(toggleOptions(event))
  }

  rooms.forEach(createOption)
  $select.appendChild(optgroup)
  $select.addEventListener('change', highlightRoom)
  $search.addEventListener('keyup', reduce)
})()
