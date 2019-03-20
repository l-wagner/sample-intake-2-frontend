import React, { Component } from 'react'

import uploadGridReducer from '../upload/uploadGridReducer'

import { initialGridStateMock } from '../../mocks'

const gridTestStore = initialGridStateMock

describe('upload grid reducers', () => {
  it('returns the initial state', () => {
    // using lengths since jest has some issue with empty arrays showing up as undefined in matchers
    expect(uploadGridReducer(undefined, {}).length).toEqual(gridTestStore.length)
  })

  it('handles UPDATE_NUM_OF_ROWS_SUCCESS', () => {
    const action = { type: 'UPDATE_NUM_OF_ROWS_SUCCESS', rows: [], form: [] }

    expect(uploadGridReducer(gridTestStore, action)).toEqual({
      ...gridTestStore,
      rows: [],
      form: [],
    })
  })
})
