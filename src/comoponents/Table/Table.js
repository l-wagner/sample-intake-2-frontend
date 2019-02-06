import React from 'react'
import ReactDOM from 'react-dom'
import ReactDataGrid from 'react-data-grid'
import { Editors } from 'react-data-grid-addons'
import axios from 'axios'

import './table_styles.css'

// import './styles.css'

const defaultColumnProperties = {
  resizable: true,
}

const columns = [
  {
    name: 'Sample ID',
    displayName: 'Sample ID',
    key: 'userId',
    helpText:
      'The Sample ID stays with your sample for its lifetime. Letters, numbers, dashes, and underscores only, three char min. You cannot have more than one underscore consecutively.',
    editableCellTemplate: 'editableCellTemplate',
    width: 100,
  },
  {
    name: 'Species',
    displayName: 'Species',
    key: 'organism',
    helpText:
      'If your species is not available, please contact IGO immediately',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    width: 100,
    picklistName: 'Species',
  },
  {
    name: 'Nucleic Acid Type',
    displayName: 'Nucleic Acid Type',
    key: 'nucleicAcidType',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    width: 100,
    picklistName: 'Exemplar+Sample+Types',
  },
  {
    name: 'Preservation',
    displayName: 'Preservation',
    key: 'preservation',
    helpText:
      'The preservation method of your material is critical to understanding how to process your samples and anticipate issues.  Please complete as accurately as possible. If your preservation is not listed, please contact IGO',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    width: 100,
    picklistName: 'Preservation',
  },
  {
    name: 'Sample Origin',
    displayName: 'Sample Origin',
    key: 'sampleOrigin',
    helpText:
      'The sample origin is important for analysis.  Please complete as accurately as possible.',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Sample+Origins',
    width: 100,
  },
  {
    name: 'Specimen Type',
    displayName: 'Specimen Type',
    key: 'specimenType',
    helpText:
      'The specimen type is important for analysis.  Please complete as accurately as possible.',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Specimen+Types',
    width: 100,
  },
  {
    name: 'Sequencing Read Length',
    displayName: 'Sequencing Read Length',
    key: 'sequencingReadLength',
    helpText:
      'If you are unsure of what read length is needed, please contact your data analyst or IGO.  There are different read lengths for different applications and we are happy to suggest a length. If you do not see your read length listed, please contact IGO immediately',

    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Illumina+Sequencing+Run+Types',
    width: 200,
  },
  {
    name: 'Reads Requested/Coverage',
    displayName: 'Reads Requested/Coverage',
    key: 'requestedReads',
    helpText:
      'Please tell us how many reads you would us to generate per sample.  If you are submitting for custom capture or whole exome capture, please tell us how much coverage you would like.  If you are submitting pre-made libraries, you must request by lane.  If you are using a custom sequencing primer, you must request an entire flow cell. Please contact IGO if you have any questions',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Reads+Coverage',
    width: 200,
  },
  {
    name: 'Index',
    displayName: 'Index',
    key: 'index',
    helpText:
      'This list represents barcodes that are already registered with IGO.  Please select from the list.  If you are submitting custom barcodes, you must pre-register them with IGO, and confirm your design and construct in advance.  Once you have identified the barcode by name, the sequence will appear in the adjacent key.  Please confirm that the sequence is expected based on your documentation.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },

  {
    name: 'Barcode Position',
    displayName: 'Barcode Position',
    key: 'barcodePosition',
    helpText:
      'Please let us know what position the barcode is expected to be found.  Standard Illumina Index barcodes are located in position 42-46',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Index Sequence',
    displayName: 'Index Sequence',
    key: 'indexSequence',
    helpText: 'Actual barcode sequence based on tag you choose display only',
    editableCellTemplate: 'editableCellTemplate',
    enableCellEdit: 'false',
    width: 150,
  },
  {
    name: 'Nucleic Acid Type to Extract',
    displayName: 'Nucleic Acid Type to Extract',
    key: 'naToExtract',
    helpText:
      'For samples submitted for extraction, please tell us what we should extract out of the material.',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Nucleic+Acid+Type+to+Extract',
    width: 150,
  },
  {
    name: 'Cell Count',
    displayName: 'Cell Count',
    key: 'cellCount',
    helpText:
      'Please tell us the number of cells in your sorted population.  This number is important for us to provide you with the best extraction results.',
    helpText: 'numberOfCells',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Volume (uL)',
    displayName: 'Volume (uL)',
    key: 'vol',
    helpText:
      'Please provide us with the volume of sample in microliters.  Please note there are different requirements for each application, and if you have any questions, please contact IGO.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Concentration (ng/uL)',
    displayName: 'Concentration (ng/uL)',
    key: 'concentration',
    helpText:
      'You must supply this in nanograms per microliter.  If you are unsure, please provide us with an approximation.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Quantity of Tubes',
    displayName: 'Quantity of Tubes',
    key: 'numTubes',
    type: 'number',
    helpText:
      'Number of Tubes per sample.  If you are submitting slides, please use this key to tell us how many slides per sample you will submit.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Assay(s)',
    displayName: 'Assay(s)',
    key: 'assay',
    helpText:
      'This key is multi-select.  If you are submitting one sample for multiple assays, please select the first, followed by the second, than the third, in the order of priority.',
    editableCellTemplate: 'uiMultiSelect',
    width: 300,
    picklistName: 'ddPCR+Assay',
  },
  {
    name: 'Estimated % Tumor',
    displayName: 'Estimated % Tumor',
    key: 'estimatedPurity',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    editDropdownOptionsArray: 'percent_tumor_options',
    width: 150,
  },
  {
    name: 'Collection Year',
    displayName: 'Collection Year',
    key: 'collectionYear',
    type: 'number',
    helpText: 'Years only, dates are PHI and are unacceptable',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Tumor Type',
    displayName: 'Tumor Type',
    key: 'cancerType',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'tumorType',
    width: 150,
  },
  {
    name: 'Sample Class',
    displayName: 'Sample Class',
    key: 'sampleClass',
    helpText:
      'Please provide us with detailed information about the Tumor or Normal status, and please be as precise as possible.  This value is critical for data analysis.',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Sample+Class',
    width: 150,
  },
  {
    name: 'Tissue Site',
    displayName: 'Tissue Site',
    key: 'tissueType',
    helpText: 'Site where tumor removed. If unknown, leave blank.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Patient ID',
    displayName: 'Patient ID',
    key: 'patientId',
    helpText:
      "For MSKCC patients, please type or paste in the patient's MRN.  CRDB will provide IGO with de-identified patient ID's that will exist in a 1:1 fashion for perpetuity, across all submissions and studies.  For non-MSKCC patient samples, mouse samples, or cell lines without patient origin, please use this key to provide us with group names i.e. compare this group (A) with this group (B)",
    helpText:
      'For non-MSKCC patient samples, mouse samples, or cell lines without patient origin, please use this key to provide us with group names i.e. compare this group (A) with this group (B). For CMO projects, fill out something unique and correspond with your PM for more information.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Normalized Patient Id',
    displayName: 'Normalized Patient Id',
    key: 'normalizedPatientId',
    cellEditableCondition: 'False',
    helpText: 'Normalized Patient Id that is sent to CMO service',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'CMO Patient Id',
    displayName: 'CMO Patient Id',
    key: 'cmoPatientId',
    cellEditableCondition: 'False',
    helpText: 'CMO anonymized patient id',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Sex',
    displayName: 'Sex',
    key: 'gender',
    helpText:
      'Sex information is important for calling Copy-Number Variations on sex chromosome (X,Y) genes.  Without this information, you may miss important data during analysis.  If you have any questions, please contact Platform Informatics',
    editableCellTemplate: 'ui-grid/dropdownEditor',
    picklistName: 'Gender',
    width: 150,
  },
  {
    name: 'Known Genetic Alteration',
    displayName: 'Known Genetic Alteration',
    key: 'geneticAlterations',
    helpText: 'If known, otherwise leave blank.',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Clinical Info',
    displayName: 'Clinical Info',
    key: 'clinicalInfo',
    editableCellTemplate: 'editableCellTemplate',
    width: 150,
  },
  {
    name: 'Sample Type',
    displayName: 'Sample Type',
    headerCellClass: 'optional',
    key: 'sampleType',
    editableCellTemplate: 'editableCellTemplate',
    width: 100,
  },
  {
    name: 'Recipe',
    displayName: 'Recipe',
    headerCellClass: 'optional',
    key: 'recipe',
    editableCellTemplate: 'editableCellTemplate',
    width: 100,
  },
  {
    name: 'CMO Sample Type',
    displayName: 'CMO Sample Type',
    headerCellClass: 'optional',
    key: 'specimenType',
    editableCellTemplate: 'editableCellTemplate',
    width: 100,
  },
  {
    name: 'Spike In Genes',
    displayName: 'Spike In Genes',
    headerCellClass: 'optional',
    key: 'spikeInGenes',
    editableCellTemplate: 'editableCellTemplate',
    width: 100,
  },
  {
    name: 'Platform',
    displayName: 'Platform',
    headerCellClass: 'optional',
    key: 'platform',
    editableCellTemplate: 'editableCellTemplate',
    width: 100,
  },
].map(column => ({
  ...column,
  ...defaultColumnProperties,
}))

const { DropDownEditor } = Editors
const issueTypes = [
  { id: 'bug', value: 'Bug' },
  { id: 'epic', value: 'Epic' },
  { id: 'story', value: 'Story' },
]
const IssueTypeEditor = <DropDownEditor options={issueTypes} />

const rows = [
  {
    id: 0,
    serviceId: 'Task 1',
    micronicTubeBarcode: 'Bug',
    knownGeneticAlteration: 20,
    wellPosition: 20,
    tooltip:
      'Fill Plate by Column. It must have at least one letter followed by a number',
  },
  {
    id: 1,
    serviceId: 'Task 2',
    micronicTubeBarcode: 'Story',
    knownGeneticAlteration: 40,
    wellPosition: 40,
    tooltip:
      'Fill Plate by Column. It must have at least one letter followed by a number',
  },
  {
    id: 2,
    serviceId: 'Task 3',
    micronicTubeBarcode: 'Epic',
    knownGeneticAlteration: 60,
    wellPosition: 60,
    tooltip:
      'Fill Plate by Column. It must have at least one letter followed by a number',
  },
]

class Table extends React.Component {
  state = { rows, columns }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice()
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated }
      }
      return { rows }
    })
  }

  componentWillMount() {
    // axios.get('http://localhost:9004/allColumns').then(res => {
    //   var res_columns = res.data.columnDefs.map(column => column)
    //   for (var i = 0; i < res_columns.length; i++) {
    //     columns.push({ key: res_columns[i].field, name: res_columns[i].name })
    //   }
    //   columns = columns.map(column => ({
    //     ...column,
    //     ...defaultColumnProperties,
    //   }))
    //   console.log(columns)
    //   this.setState({ columns: columns })
    // })
    // for (var i = 0; i < columns.length; i++) {
    //    columns.push({ key: res_columns[i].field, name: res_columns[i].name })
    //  }
    //  columns = columns.map(column => ({
    //    ...column,
    //    ...defaultColumnProperties,
    //  }))
    console.log(this.state.columns)

    //   this.setState({ columns: columns })

    window.dispatchEvent(new Event('resize'))
  }

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={3}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          width="100%"
        />
      </div>
    )
  }
}

export default Table
