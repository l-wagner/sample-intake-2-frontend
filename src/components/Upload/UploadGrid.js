import React from 'react'
import { withStyles } from '@material-ui/core'
import { GridButton } from './index'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
import swal from '@sweetalert/with-react'

// after comparing agGrid, react-data-grid, canvas-datagrid, react-data-sheet, ReactHandsOnTable won
class UploadGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = { invalidCells: [] } //   // this.handsontableData = this.props.grid.rows
    //   this.handsontableCols = this.props.grid.columns
    //   this.handsontableColFeatures = this.props.grid.columnFeatures
    // }

    this.hotTableComponent = React.createRef()
  }

  getErrorMsg = () => {
    for (let i = 0; i < numberToAdd; i++) {}
  }
  showError = error => {
    console.log(error)

    swal(error)
  }

  handleSubmit = () => {
    const { columnFeatures, rows } = this.props.grid

    // run through grid required columns
    let emptyColumns = new Set()
    console.log(columnFeatures)
    console.log(rows)
    for (let i = 0; i < columnFeatures.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (
          columnFeatures[i].optional == false &&
          !rows[j][columnFeatures[i].data]
        ) {
          console.log(rows[j][columnFeatures[i].data])
          emptyColumns.add(columnFeatures[i].columnHeader)
        }
      }
    }

    if (emptyColumns.size > 0) {
          console.log(emptyColumns.size)
      swal('Required', [...emptyColumns].join('\n '), 'error')
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <HotTable
          licenseKey="non-commercial-and-evaluation"
          id="hot"
          data={this.props.grid.rows}
          colHeaders={this.props.grid.columns}
          columns={this.props.grid.columnFeatures}
          rowHeaders={true}
          headerTooltips={true}
          manualColumnResize={true}
          comments={true}
          ref={this.hotTableComponent}
          // colWidths="190"
          // cells={function(row, col, prop) {
          //   // first row contains helptext
          //   var cellProperties = {}
          //   if (row === 0) {
          //     cellProperties.readOnly = true
          //     cellProperties.className = classes.tooltipCell
          //     cellProperties.type = 'text'
          //   }
          //   return cellProperties
          // }}
          afterValidate={(isValid, value, row, prop, source) => {
            // let error = this.getErrorMsg(col)

            // let col = this.hotTableComponent.current.hotInstance.propToCol(prop)
            // alert("col.error")
            // let col = this.propToCol(prop)
            if (!isValid) {
              let col = this.hotTableComponent.current.hotInstance.propToCol(
                prop
              )

              this.showError(this.props.grid.columnFeatures[col].error)
            }
            // this.setState({
            //   status: isValid,
            //   [col]: this.props.grid.columnFeatures[col].error,
            // })
          }}
          // afterChange={(changes, source) => {
          //   if (source === 'edit') {
          //     console.log(changes[0][1])
          //     if (this.state.status === false) {
          //       const TD = this.hotTableComponent.current.hotInstance.getCell(
          //         changes[0][0],
          //         this.hotTableComponent.current.hotInstance.propToCol(changes[0][1])
          //       )
          //       console.log(TD)

          //       if (!this.state.invalidCells.includes(TD)) {
          //         this.state.invalidCells.push(TD)
          //       }

          //       this.state.invalidCells.forEach((td, index) => {
          //         if (!td.classList.contains('htInvalid')) {
          //           td.classList.add('htInvalid')
          //         }
          //       })
          //     }

          //     if (this.state.invalidCells.length) {
          //       this.state.invalidCells.forEach((td, index) => {
          //         if (td.classList.contains('htNumeric')) {
          //           td.classList.remove('htInvalid')
          //           this.state.invalidCells.splice(index, 1)
          //         } else {
          //           td.classList.add('htInvalid')
          //         }
          //       })
          //     }
          //   }
          // }}
          width="95vw"
          height={() => {
            if (this.props.grid.rows.length >= 25) return '700'
            // else if (this.props.grid.rows.length >= 900) return '100vh'
            else if (this.props.grid.rows.length >= 20) return '510'
            else if (this.props.grid.rows.length >= 15) return '500'
            else if (this.props.grid.rows.length >= 5) return '300'
          }}
        />
        <GridButton
          id="grid_submit"
          onSubmit={this.handleSubmit}
          isLoading={false}
          nothingToSubmit={false}
        />
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    // borderRight: '1px solid gray',
    display: 'grid',
    justifyItems: 'center',
  },
  tooltipCell: {
    fontSize: '.8em',
    color: 'black !important',
    backgroundColor: '#cfd8dc !important',
  },
  submit: {
    width: '30px',
  },
})

export default withStyles(styles)(UploadGrid)

// Syntax Examples
// colHeaders: [
//   'ID',
//   'Country',
//   'Code',
//   'Currency',
//   'Level',
//   'Units',
//   'Date',
//   'Change'
// ],

// columns: [
//    {
//      data: 'id',
//      type: 'numeric',
//      width: 40
//    },
//    {
//      data: 'flag',
//      renderer: flagRenderer
//    },
//    {
//      data: 'currencyCode',
//      type: 'text'
//    },
//    {
//      data: 'currency',
//      type: 'text'
//    },
//    {
//      data: 'level',
//      type: 'numeric',
//      numericFormat: {
//        pattern: '0.0000'
//      }
//    },
//    {
//      data: 'units',
//      type: 'text'
//    },
//    {
//      data: 'asOf',
//      type: 'date',
//      dateFormat: 'MM/DD/YYYY'
//    },
//    {
//      data: 'onedChng',
//      type: 'numeric',
//      numericFormat: {
//        pattern: '0.00%'
//      }
//    }
//  ],

// dataObject = [
// {
//   id: 1,
//   flag: 'EUR',
//   currencyCode: 'EUR',
//   currency: 'Euro',
//   level: 0.9033,
//   units: 'EUR / USD',
//   asOf: '08/19/2019',
//   onedChng: 0.0026
// },
// {
//   id: 2,
//   flag: 'JPY',
//   currencyCode: 'JPY',
//   currency: 'Japanese Yen',
//   level: 124.3870,
//   units: 'JPY / USD',
//   asOf: '08/19/2019',
//   onedChng: 0.0001
// },
// {
//   id: 3,
//   flag: 'GBP',
//   currencyCode: 'GBP',
//   currency: 'Pound Sterling',
//   level: 0.6396,
//   units: 'GBP / USD',
//   asOf: '08/19/2019',
//   onedChng: 0.00
// }]
