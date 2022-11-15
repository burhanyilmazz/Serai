import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';

import * as Yup from 'yup'
import {useFormik} from 'formik'

import styles from '../assets/styles/Customize.module.scss'
import { Logo, Detail, CustomTitle, CustomListButton, CustomListRadio, FormSelect, Button, Icon, FormInput, PhoneFormInput, Carousel, SelectedList, Modal, ModalCarousel, FormCheckbox } from '../components';

export default function Customize({exteriors, interiors, detailedinfo, settings, exteriors_more_info_images, interiors_more_info_images, variant_images}) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isPageOne, setIsPageOne] = useState(true);
  const [isMore, setIsMore] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [checkboxAllow, setCheckboxAllow] = useState(true);
  const [agreementModal, setAgreementModal] = useState(false);
  const [moreModal, setMoreModal] = useState();
  const [productPrice, setProductPrice] = useState(Number(settings.product_price));

  const customizeSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong format.')
      .required('This field cannot be left blank.'),
    namesurname: Yup.string().required('This field cannot be left blank.'),
    phone: Yup.string().required('This field cannot be left blank.'),
    permission: Yup.bool().oneOf([true], 'This field cannot be left blank.')
  })

  const [customize] = useState({
    namesurname: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    permission: ''
  })

  const formik = useFormik({
    initialValues: customize,
    validationSchema: customizeSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      setIsSuccess(true)
      console.log(values)
    },
  })

  const handleChange = (name, item) => {
    if (name === 'exterior') {
      setExteriorImg(item.big_image);
    }

    if (name === 'appliancess') {
      setAppliancesImg(item.big_image);
    }

    if (name === 'mind') {
      setMindImg(item.big_image);
    }

    setBigImg(item.big_image)
    setProductPrice(productPrice + Number(item.lastPrice))
  };

  const handleChangePermission = (newValue, name) => {
    setCheckboxAllow(!checkboxAllow)
    formik.setFieldValue('permission', !checkboxAllow)
  };

  const onClickMore = (name) => {
    setIsMoreInfo(true);
    
    setMoreModal(name === 'exterior' ? exteriors_more_info_images : interiors_more_info_images)
  };

  const colors = interiors.filter(item => item.product_type === 'colors')
  const appliances = interiors.filter(item => item.product_type === 'appliances')
  const mind = interiors.filter(item => item.product_type === 'mind')
  
  const findImgExteriors = exteriors.find(item => item.is_selected);
  const [bigImg, setBigImg] = useState(findImgExteriors?.big_image || exteriors[0].big_image);
  const [exteriorImg, setExteriorImg] = useState(findImgExteriors?.big_image || exteriors[0].big_image);

  const findImgAppliances = appliances.find(item => item.is_selected);
  const [appliancesImg, setAppliancesImg] = useState(findImgAppliances?.big_image || appliances[0].big_image);

  const findImgMind = mind.find(item => item.is_selected);
  const [mindImg, setMindImg] = useState(findImgMind?.big_image || mind[0].big_image);

  const colorDefaultSelected = [];
  colors.map(item => {
    const color = item.color_details.find(filt => filt.is_selected);

    if (color) {
      colorDefaultSelected.push(`${item.id}-${color.id}`)
    }
  })

  const [colorSelected] = useState(colorDefaultSelected);
  const [colorImg, setColorImg] = useState();

  useEffect(() => {
    const form_data = new FormData();
    form_data.append('ids', [JSON.stringify(colorSelected)]);
    fetch(`https://serai.ozanuzer.com/api/variant_images`, {
      method: 'POST',
      body: form_data
    })
    .then(r => r.json())
    .then(data => setColorImg(data.Result.image));
  }, [colorSelected])
  
  const handleChangeColor = async (item, checklist) => {
    //const product = colors.find(f => f.color_details.find(c => c == item))
    //console.log(product)
    const form_data = new FormData();
    form_data.append('ids', [JSON.stringify(checklist)]);
    await fetch(`https://serai.ozanuzer.com/api/variant_images`, {
      method: 'POST',
      body: form_data
    })
    .then(r => r.json())
    .then(data => {
      setColorImg(data.Result.image)
      setBigImg(data.Result.image)
    });

    setProductPrice(productPrice + Number(item.lastPrice))
    console.log(colorImg)
  }

  const country = [
    { id: 1, label: 'Türkiye' },
    { id: 2, label: 'Sweden' },
    { id: 3, label: 'England' },
    { id: 4, label: 'Germany' },
  ]

  const carousel = [
    { image: '/images/custom/img-2.jpg' },
    { image: '/images/custom/img-1.jpg' },
    { image: '/images/custom/img-1.jpg' },
    { image: '/images/custom/img-1.jpg' },
  ]

  const selectedList = [
    {
      title: 'Reserve Online',
      description: 'Customer support will contact you'
    },
    {
      title: '10 %',
      description: 'Reservation deposit'
    },
    {
      title: '40 %',
      description: 'Signing contract Start of production'
    },
    {
      title: '12 -16 Weeks',
      description: 'Production Time'
    },
    {
      title: '30 %',
      description: 'Final payment prior shipping'
    },
    {
      title: '20%',
      description: 'Final payment'
    }
  ]

  return (
    <>
      <section className={styles['customize']}>
        <div className={styles['customize__logo']}><Logo /></div>

        {isPageOne && <div className={classNames(styles['head'], styles['head--title'], 'only-mobile')}>
          <h1>Serai One</h1>
          <p>Est. Delivery: Oct - Dec 2022</p>
          <span onClick={() => setIsShowDetail(true)}>Learn about materials</span>
        </div>}

        <div className={styles['content']}>
          {!isPageOne &&<div className={styles['carousel']}>
            <Carousel data={carousel} className={classNames({'carousel__slider--list': !isSuccess})} />
            {!isSuccess && <SelectedList data={selectedList} className={styles['selected-list']} /> }
          </div>
          }

          {isPageOne && 
            <>
              <Image src={bigImg} width={1388} height={980} alt={'Serai One'} priority className='only-desktop' />
              <Image src={exteriorImg} width={1388} height={980} alt={'Serai One'} priority className='only-mobile' />
            </>
          }
        </div>

        <aside className={styles['custom']}>
          {isPageOne && <>
            <div className={classNames(styles['head'], 'only-desktop')}>
              <h1>Serai One</h1>
              <p>Est. Delivery: Oct - Dec 2022</p>
              <span onClick={() => setIsShowDetail(true)}>Learn about materials</span>
            </div>

            <div className={styles['body']}>
              <div className={styles['group']}>
                <CustomTitle 
                  page={'1/6'}
                  title={'Exterior'}
                  desc={'Ut vel purus aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.'}
                  more
                  onClick={() => onClickMore('exterior')}
                />
                <CustomListButton data={exteriors} onClick={(item) => handleChange('exterior', item)} />
              </div>

              <div className={styles['group']}>
                <div className={styles['group__img']}>
                  {colorImg && <Image src={colorImg} width={1388} height={980} alt={'Interior Colors'} />}
                </div>
                
                <CustomTitle 
                  page={'2/6'}
                  title={'Interior'}
                  desc={'Ut vel purus aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.'}
                  more
                  onClick={() => onClickMore('interior')}
                />
                <CustomListRadio data={colors} onChange={(item, checklist) => handleChangeColor(item, checklist)} />

                <div className={styles['group__child']}>
                  <div className={styles['group__img']}>
                    <Image src={appliancesImg} width={1388} height={980} alt={'Appliances'} />
                  </div>

                  <CustomTitle 
                    page={'3/6'}
                    subtitle={'Appliances'}
                  />
                  <CustomListButton data={appliances} onClick={(item) => handleChange('appliancess', item)} />
                </div>

                <div className={styles['group__child']}>
                  <div className={styles['group__img']}>
                    <Image src={mindImg} width={1388} height={980} alt={'Mind'} />
                  </div>

                  <CustomTitle 
                    page={'4/6'}
                    subtitle={'Mind'}
                  />
                  <CustomListButton data={mind} onClick={(item) => handleChange('mind', item)} />
                </div>
              </div>

              <div className={styles['group']}>
                <CustomTitle 
                  page={'5/6'}
                  title={'Address'}
                  desc={'Please Choose Your Delivery Location'}
                />
                <div className='form-group'>
                  <FormSelect 
                    options={country}
                    onChange={(value) => console.log(value)}
                    field={'Country'}
                    instanceId='country'
                  />
                </div>
                <div className='form-group'>
                  <FormSelect 
                    options={country}
                    onChange={(value) => console.log(value)}
                    field={'City'}
                    instanceId='city'
                  />
                </div>
                <div className='form-group-buttons'>
                  <Button text={'Next'} className={styles['button']} onClick={() => setIsPageOne(false)} />
                </div>

                <div className={styles['country-note']}>
                  <h5>Order Your Serai One</h5>
                  <h6>Est. Delivery: Oct - Dec 2022</h6>
                </div>
              </div>
            </div>

            <div className={styles['foot']}>
              <div className={styles['foot__title']}>Total Price:</div>
              <div className={styles['foot__total']}>${productPrice}</div>
            </div>
          </> }

          {!isPageOne && <>
              {!isSuccess && <div className={styles['head']}>
                <div className={styles['head__button']} onClick={() => setIsPageOne(true)}>
                  <Icon icon={'arrow'} /> Edit Design
                </div>
              </div> }

              <div className={styles['body']}>
                <div className={styles['group']}>
                  {!isSuccess && <CustomTitle 
                    page={'6/6'}
                    title={'Summary'}
                    desc={'Selected Product Specifications'}
                    /> }
                  {isSuccess && <CustomTitle 
                    icon='times'
                    title={'Order Confirmed'}
                    desc={'Selected Product Specifications'}
                    button
                    onClick={() => console.log("sdas")}
                  /> }
                  <div className={styles['basket']}>
                    <table>
                      <tbody>
                        <tr>
                          <th>Exterior</th>
                          <td>Reynisfjara (Black)</td>
                        </tr>
                        <tr>
                          <th className={styles['no-border']}>Interior</th>
                          <td className={styles['no-border']}>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>Walls</td>
                          <td>Lapland (White)</td>
                        </tr>
                        <tr>
                          <td>Floors</td>
                          <td>Lapland (White)</td>
                        </tr>
                        <tr>
                          <th>Appliances</th>
                          <td>Ready for dinner</td>
                        </tr>
                        <tr>
                          <th>Mind</th>
                          <td>IoT & AI</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={styles['more-box']}>
                    <div className={classNames(styles['more-box__button'], {[styles['more-box__button--more']]: isMore})} onClick={() => setIsMore(!isMore)}>
                      { isMore ? 'Show' : 'Hide' } Details <Icon icon={'arrow'} />
                    </div>

                    {!isMore && <table>
                      <tbody>
                        <tr>
                          <td>Serai One:</td>
                          <td>$82.000</td>
                        </tr>
                        <tr>
                          <td>Walls Lapland (White):</td>
                          <td>$2.000</td>
                        </tr>
                        <tr>
                          <td>Floors Lapland (White):</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <td>Apliances Ready for dinner:</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <td>Mind IOT and AI:</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <td>Toplam:</td>
                          <td><b>$128.000</b></td>
                        </tr>
                        <tr>
                          <td>Ödenecek Tutar (20%):</td>
                          <td><b>$1.500</b></td>
                        </tr>
                      </tbody>
                    </table>}
                  </div>

                  <div className={styles['summary-box']}>
                    <table>
                      <tbody>
                        <tr>
                          <td>Home Price:</td>
                          <td>$82.000</td>
                        </tr>
                        <tr>
                          <td>Destination Fee:</td>
                          <td>$2.000</td>
                        </tr>
                        <tr>
                          <td>Order Fee:</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <td>Your Model Serai One:<br /><span>Excluding taxes & other fees</span></td>
                          <td><b>$92.800</b></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {!isSuccess && <div className={styles['form']}>
                    <form onSubmit={formik.handleSubmit} noValidate>
                      <h4>Contact Information</h4>
                      
                      <div className='form-group'>
                        <FormInput 
                          field='Full Name'
                          required
                          errorMessage={formik.errors.namesurname}
                          {...formik.getFieldProps('namesurname')}
                          className={classNames({'is-invalid': formik.touched.namesurname && formik.errors.namesurname})}
                        />
                      </div>

                      <div className='form-group'>
                        <PhoneFormInput 
                          field='Phone'
                          name='phone'
                          required
                          onChange={(value) => formik.setFieldValue('phone', value)}
                        />
                      </div>

                      <div className='form-group'>
                        <FormInput 
                          field='E-Mail'
                          type="email" 
                          required
                          errorMessage={formik.errors.email}
                          {...formik.getFieldProps('email')}
                          className={classNames({'is-invalid': formik.touched.email && formik.errors.email})}
                        />
                      </div>

                      <h4>Address</h4>

                      <div className='form-group'>
                        <FormSelect 
                          options={country}
                          onChange={(value) => console.log(value)}
                          field={'Country'}
                          instanceId='country'
                        />
                      </div>
                      <div className='form-group'>
                        <FormInput 
                          field='Street address or P:O. Box'
                          required
                          errorMessage={formik.errors.street}
                          {...formik.getFieldProps('street')}
                          className={classNames({'is-invalid': formik.touched.street && formik.errors.street})}
                        />
                      </div>
                      <div className='form-group'>
                        <div>
                          <FormSelect 
                            options={country}
                            onChange={(value) => console.log(value)}
                            field={'City'}
                            instanceId='city'
                          />
                        </div>
                        <div>
                          <FormSelect 
                            options={country}
                            onChange={(value) => console.log(value)}
                            field={'State'}
                            instanceId='state'
                          />
                        </div>
                      </div>
                      <div className='form-group'>
                        <FormCheckbox
                          label='<u>Lorem ipsum</u> dolor sit amet.'
                          onChange={(newValue) => handleChangePermission(newValue, 'permission')}
                          checked={checkboxAllow}
                          errorMessage={formik.errors.permission}
                          name={'permission'}
                          required
                          className={classNames({'is-invalid': formik.touched.permission && formik.errors.permission})}
                          onClickText={() =>  setAgreementModal(true)}
                        />
                      </div>
                      <div className='form-group-buttons'>
                        <Button text={'Continue With Card'} button className={styles['button']} />
                        <Button text={'Continue With X'} button className={styles['button']} thirty />
                      </div>
                    </form>
                  </div> }
                </div>
              </div>
            </>
          }
        </aside>
      </section>

      {isMoreInfo && <Modal onClose={() => setIsMoreInfo(false)}>
        <ModalCarousel data={moreModal} />
      </Modal> }

      {agreementModal && <Modal onClose={() => setAgreementModal(false)}>
        <div className={styles['permission']}>
          <div className={styles['permission__content']}>
            <h3>Structure</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, </p>
          </div>
        </div>
      </Modal> }
      
      <Detail 
          isShow={isShowDetail} 
          title={detailedinfo?.title} 
          content={detailedinfo?.content} 
          onClickClose={() => setIsShowDetail(false)} 
        />
    </>
  )
}

export async function getStaticProps() {
  const detailedinfo = await fetch(`${process.env.API_URL}/detailedinfo`).then(r => r.json()).then(data => data.Result);
  const exteriors = await fetch(`${process.env.API_URL}/exteriors`).then(r => r.json()).then(data => data.Result);
  const settings = await fetch(`${process.env.API_URL}/settings`).then(r => r.json()).then(data => data.Result);
  const interiors = await fetch(`${process.env.API_URL}/interiors`).then(r => r.json()).then(data => data.Result);
  const interiors_more_info_images = await fetch(`${process.env.API_URL}/interiors_more_info_images`).then(r => r.json()).then(data => data.Result);
  const exteriors_more_info_images = await fetch(`${process.env.API_URL}/exteriors_more_info_images`).then(r => r.json()).then(data => data.Result);
  const variant_images = await fetch(`${process.env.API_URL}/variant_images`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      detailedinfo,
      exteriors,
      settings,
      interiors,
      interiors_more_info_images,
      exteriors_more_info_images,
      variant_images
    },
    revalidate: 10,
  }
}

