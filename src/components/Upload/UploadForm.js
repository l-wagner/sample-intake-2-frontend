import React from 'react'
import { Translate } from 'react-localize-redux'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import InputAdornment from '@material-ui/core/InputAdornment'

import Button from '@material-ui/core/Button'
import Dropdown from './Dropdown'
import Input from './Input'

class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        material: '',
        application: '',
        igo_request_id: '',
        number_of_samples: '',
        species: '',
        container: '',
        patient_id_format: '',
      },
      formErrors: {
        material: '',
        application: '',
        igo_request_id: '',
        number_of_samples: '',
        species: '',
        container: '',
        patient_id_format: '',
      },
      formValid: {
        form: true,
        material: true,
        application: true,
        igo_request_id: true,
        number_of_samples: true,
        species: true,
        container: true,
        patient_id_format: true,
      },
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevState')
    console.log(prevState)
    console.log('state')
    console.log(this.state)
  }

  handleDropdownChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.id]: event.value,
      },
      formValid: { ...this.state.formValid, [event.id]: true },
    })
  }

  handleInputChange = name => event => {
    const fieldName = name
    const value = event.target.value

    // reset error
    this.setState({
      values: { ...this.state.values, [name]: value },
      formValid: { ...this.state.formValid, [name]: true },
    })
  }

  handleSubmit = (e, handleParentSubmit) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e)
    this.validate()
    if (this.state.formValid.form) {
      handleParentSubmit(this.state)
    } else alert('error')
  }

  validate() {
    // let formErrors = this.state.formErrors
    let formValid = this.state.formValid
    let valid
    let error
    let values = this.state.values
    for (let value in values) {
      console.log(value)

      switch (value) {
        // only field needing actual validation so far
        case 'igo_request_id':
          formValid.igo_request_id =
            /\d{6}/g.test(values[value]) && values[value].length === 6
          // formErrors.igo_request_id = valid ? '' : ' is invalid'

          break

        // all others just have to be filled out
        case 'material':
        case 'application':
        case 'number_of_samples':
        case 'species':
        case 'container':
        case 'patient_id_format':
          formValid[value] = values[value].length > 0
          // error = valid ? '' : 'Please fill out this field'
          break

        default:
          break
      }
    }

    this.setState({
      formValid: {
        ...this.state.formValid,
        formValid,
      },
    })
    // checked all fields, now check form
    this.validateForm()
  }

  validateForm() {
    this.setState({
      formValid: {
        ...this.state.formValid,
        form:
          this.state.formValid.igo_request_id &&
          this.state.formValid.material &&
          this.state.formValid.application &&
          this.state.formValid.igo_request_id &&
          this.state.formValid.number_of_samples &&
          this.state.formValid.species &&
          this.state.formValid.container &&
          this.state.formValid.patient_id_format,
      },
    })
  }

  render() {
    const {
      classes,
      form,
      handleSubmit,
      handleApplicationChange,
      handleMaterialChange,
    } = this.props

    const { formErrors, values, formValid } = this.state

    return (
      <Translate>
        {({ translate }) => (
          <div className={classes.form}>
            <form
              id="upload-form"
              className={classes.container}
              onSubmit={e => this.handleSubmit(e, handleSubmit)}
            >
              <Dropdown
                dynamic={true}
                loading={form.isLoading}
                onSelect={handleMaterialChange}
                onChange={this.handleDropdownChange}
                items={form.materials.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                getInputProps={() => ({
                  id: 'material',
                  error: !this.state.formValid.material,

                  label: translate('header.material_label'),
                  helperText:
                    translate('header.material_helptext') +
                    ' (' +
                    form.materials.length +
                    ' choices)',
                })}
              />

              <Dropdown
                dynamic={true}
                loading={form.isLoading}
                onSelect={handleApplicationChange}
                onChange={this.handleDropdownChange}
                items={form.applications.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                getInputProps={() => ({
                  id: 'application',
                  error: !this.state.formValid.application,

                  label: translate('header.application_label'),
                  helperText:
                    translate('header.application_helptext') +
                    ' (' +
                    form.applications.length +
                    ' choices)',
                })}
              />

              <Dropdown
                loading={form.isLoading}
                onChange={this.handleDropdownChange}
                items={form.containers.map(option => ({
                  value: option,
                  label: option,
                }))}
                required
                getInputProps={() => ({
                  id: 'container',
                  error: !this.state.formValid.container,
                  label: this.state.formValid.container
                    ? translate('header.container_label')
                    : translate('header.fill_me'),
                  helperText:
                    translate('header.container_helptext') +
                    ' (' +
                    form.containers.length +
                    ' choices)',
                })}
              />

              <Dropdown
                items={form.picklists.Species.map(option => ({
                  value: option.id,
                  label: option.value,
                }))}
                onChange={this.handleDropdownChange}
                getInputProps={() => ({
                  id: 'species',
                  error: !this.state.formValid.species,

                  label: translate('header.species_label'),
                  helperText: translate('header.species_helptext'),
                })}
              />

              <Dropdown
                items={form.picklists['Patient ID Format'].map(option => ({
                  value: option,
                  label: option,
                }))}
                onChange={this.handleDropdownChange}
                getInputProps={() => ({
                  id: 'patient_id_format',
                  error: !this.state.formValid.patient_id_format,

                  label: translate('header.patient_id_format_label'),
                  helperText: translate('header.patient_id_format_helptext'),
                })}
              />

              <Input
                error={!this.state.formValid.number_of_samples}
                // error={!this.state.formValid.number_of_samples}
                id="number_of_samples"
                classes={classes.textField}
                type="number"
                inputProps={{
                  inputProps: { min: 0 },
                }}
                label={translate('header.sample_number_label')}
                helperText={
                  this.state.formErrors.number_of_samples.length > 1
                    ? formErrors.number_of_samples
                    : translate('header.sample_number_helptext')
                }
                onChange={this.handleInputChange('number_of_samples')}
              />

              <Input
                error={!this.state.formValid.igo_request_id}
                id="igo_request_id"
                classes={classes.textField}
                type="number"
                onChange={this.handleInputChange('igo_request_id')}
                label={translate('header.igo_request_id_label')}
                helperText={translate('header.igo_request_id_helptext')}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">IGO-</InputAdornment>
                  ),
                }}
              />
            </form>

            <Button
              variant="contained"
              type="submit"
              form="upload-form"
              className={classes.button}
              color="secondary"
              // disabled={!this.state.formValid.form}
            >
              {translate('header.generate_button')}
            </Button>
          </div>
        )}
      </Translate>
    )
  }
}

UploadForm.defaultProps = {
  form: {},
}

UploadForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  handleApplicationChange: PropTypes.func,
  handleMaterialChange: PropTypes.func,
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '70%',
  },
  form: {
    // backgroundColor: theme.palette.primary.light,
    gridArea: 'form',
    display: 'grid',
    justifyItems: 'center',
  },
  textField: {
    margin: 2 * theme.spacing.unit,

    minWidth: 350,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '3em',
    display: 'inline-block',
    width: 350,
  },
})

export default withStyles(styles)(UploadForm)
