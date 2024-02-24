// KanbanBoard.spec.js
import { mount } from '@vue/test-utils'
import KanbanBoard from '@/components/KanbanBoard.vue'
import { render } from '@testing-library/vue'
import axios from 'axios'
import { test, expect, beforeAll, afterEach, afterAll, describe, it } from "vitest";
import { setupServer } from 'msw/node'
import { rest } from 'msw'


describe('KanbanBoard.vue', () => {
    it('renders correctly with data', () => {
        const wrapper = mount(KanbanBoard)
        expect(wrapper.exists()).toBe(true)
      })
  it('renders the correct components', () => { 
    const wrapper = mount(KanbanBoard)
    expect(wrapper.find('.snap-start').exists()).toBe(true)
    expect(wrapper.find('.dragArea').exists()).toBe(true)
    expect(wrapper.find('.list-group').exists()).toBe(true)
  })

  it('opens modal when clicking on add button', async () => {
    const wrapper = mount(KanbanBoard)
    await wrapper.find('.open-modal-button').trigger('click')
    expect(wrapper.vm.showModal).toBe(true)
})
test('submits form when form is filled and submitted', async () => {
    const wrapper = mount(KanbanBoard)
    await wrapper.find('.open-modal-button').trigger('click')
    await wrapper.setData({ formData: { name: 'Test' } })
    await wrapper.find('.form').trigger('submit')
    expect(wrapper.vm.showModal).toBe(false)
  })
})