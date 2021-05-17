import MainHeader from '../Header/MainHeader'
import logo from '../../../img/zahra-amiri-1q6LXasG1hY-unsplash1.jpg'

function ContactEdit() {
  return (
    <div className='main'>
      <MainHeader
        showSearch='false'
        nameCreateBtn='Update'
        nameImportBtn='Discard'
        showImportBtn='true'
        showListOrCardItem='false'
        showPagination='false'
      />
      <div className='main--content__create'>
        <div className='container'>
          <form className='pt-5'>
            <img src={logo} width='100px' className='img-thumbnail mb-3' alt='...'></img>
            <div className='form-check form-check-inline ms-3'>
              <input className='form-check-input' type='radio' name='companyOrIndividualRadioOptions' id='individual' value='option1' checked />
              <label className='form-check-label' htmlFor='individual'>
                Individual
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input className='form-check-input' type='radio' name='companyOrIndividualRadioOptions' id='company' value='option2' />
              <label className='form-check-label' htmlFor='company'>
                Company
              </label>
            </div>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input type='text' className='form-control form-control-sm' id='name' aria-describedby='emailHelp' />
            </div>
            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Phone
              </label>
              <input type='text' className='form-control form-control-sm' id='phone' aria-describedby='emailHelp' />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input type='email' className='form-control form-control-sm' id='email' aria-describedby='emailHelp' />
            </div>
            <div class='mb-3'>
              <label for='address' class='form-label'>
                Address
              </label>
              <textarea class='form-control' id='address' rows='3'></textarea>
            </div>
            <button type='submit' className='btn btn-primary'>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactEdit
