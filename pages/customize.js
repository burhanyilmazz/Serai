import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import * as Yup from 'yup'
import {useFormik} from 'formik'

import styles from '../assets/styles/Customize.module.scss'
import { Logo, Detail, CustomTitle, CustomListButton, CustomListRadio, FormSelect, Button, Icon, FormInput, PhoneFormInput, Carousel, SelectedList, Modal, ModalCarousel, FormCheckbox } from '../components';

export default function Customize({exteriors, interiors, detailedinfo, settings, exteriors_more_info_images, interiors_more_info_images, summarycontents, countries}) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isPageOne, setIsPageOne] = useState(true);
  const [isMore, setIsMore] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [checkboxAllow, setCheckboxAllow] = useState(true);
  const [agreementModal, setAgreementModal] = useState(false);
  const [moreModal, setMoreModal] = useState();
  const [productPrice, setProductPrice] = useState(Number(settings.product_price));
  const [selectedCountry, setSelectedCountry] = useState();
  const [cityList, setCityList] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [loading, setLoading] = useState(true);
  const [sendData, setSendData] = useState();
  const [paypal, setPaypal] = useState(false);
  const [paypalResponse, setPaypalResponse] = useState();


  const [stepSchema, setStepSchema] = useState({
    country: Yup.object().required('This field cannot be left blank.'),
    city: Yup.object().required('This field cannot be left blank.'),
  })

  const customizeSchema = Yup.object().shape(stepSchema)
  const [customize] = useState({
    namesurname: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    street: '',
    permission: true
  })

  const formik = useFormik({
    initialValues: customize,
    validationSchema: customizeSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(false)
      if (isPageOne) {
        setIsPageOne(false)

        setStepSchema({
          namesurname: Yup.string().required('This field cannot be left blank.'),
          phone: Yup.string().required('This field cannot be left blank.'),
          email: Yup.string().email('Wrong format.').required('This field cannot be left blank.'),
          country: Yup.object().required('This field cannot be left blank.'),
          city: Yup.object().required('This field cannot be left blank.'),
          street: Yup.string().required('This field cannot be left blank.'),
          permission: Yup.bool().oneOf([true], 'This field cannot be left blank.'),
        })
      } 
      document.querySelector('aside').scrollTo(0, 0)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  })

  useEffect(() => {
    document.querySelector('html').classList.remove('snap');
    document.querySelector('html').classList.remove('disable-scroll')
  }, [])

  useEffect(() => {
    const values = formik.values;
    const emptyData = []
    for (const value in values) {
      if (!values[value]) {
        emptyData.push(value)
      }
    }
    setPaypal(emptyData.length > 0 ? false : true)
  }, [formik])

  const handleChange = (name, item) => {
    if (name === 'exterior') {
      setExteriorImg(item.big_image);
      setSelectedList({...selectedList, exteriors: item})
    }
    
    const interiors = selectedList.interiors;
    if (name === 'appliancess') {
      setAppliancesImg(item.big_image);
      interiors.appliances = item;
      setSelectedList({...selectedList, interiors})
    }

    if (name === 'mind') {
      setMindImg(item.big_image);
      interiors.mind = item;
      setSelectedList({...selectedList, interiors})
    }

    setBigImg(item.big_image)
    setProductPrice(productPrice + Number(item.lastPrice))
  };

  const handleChangePermission = () => {
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

  const [carousel, setCarousel] = useState([
    { image: exteriorImg, title: 'exterior' },
    { image: appliancesImg, title: 'appliances' },
    { image: mindImg, title: 'mind' },
  ]);

  const allList = {
    'exteriors': findImgExteriors, 
    'interiors': {
      'colors': [],
      'appliances': findImgAppliances,
      'mind': findImgMind
    }
  }

  const [selectedList, setSelectedList] = useState(allList)

  const colorDefaultSelected = [];
  colors.map(item => {
    const color = item.color_details.find(filt => filt.is_selected);
    
    if (color) {
      color['product_id'] = item.id;
      color['product_title'] = item.title;
      allList['interiors'].colors.push(color)
      colorDefaultSelected.push(`${item.id}-${color.id}`)
    }
  })
 
  const [colorSelected] = useState(colorDefaultSelected);
  
  const [colorImg, setColorImg] = useState();

  useEffect(() => {
    const form_data = new FormData();
    form_data.append('ids', [JSON.stringify(colorSelected)]);
    fetch(`${process.env.API_URL}/variant_images`, {
      method: 'POST',
      body: form_data
    })
    .then(r => r.json())
    .then(data => {
      setColorImg(data.Result.image)
      setCarousel([...carousel, { image: data.Result.image, title: 'colors' }])
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorSelected])
  
  const handleChangeColor = async (item, checklist, radioListObj) => {
    setLoading(true)
    const form_data = new FormData();
    form_data.append('ids', [JSON.stringify(checklist)]);
    await fetch(`${process.env.API_URL}/variant_images`, {
      method: 'POST',
      body: form_data
    })
    .then(r => r.json())
    .then(data => {
      setColorImg(data.Result.image)
      setBigImg(data.Result.image)
      setCarousel([...carousel, { image: data.Result.image, title: 'colors' }])
    });

    allList['interiors'].colors = radioListObj;
    setProductPrice(productPrice + Number(item.lastPrice))
  }

  useEffect(() => {
    setCarousel([
      { image: selectedList.exteriors.big_image, title: 'exterior' },
      { image: selectedList.interiors.appliances.big_image, title: 'appliances' },
      { image: selectedList.interiors.mind.big_image, title: 'mind' },
      { image: colorImg, title: 'colors' },
    ])
  }, [colorImg, selectedList])

  const onChangeCountry = async (value) => {
    formik.setFieldValue('country', value);
    setSelectedCountry(value)

    await fetch(`${process.env.API_URL}/state/${value.id}`)
      .then(r => r.json())
      .then(data => {
        setCityList(data.Result)
      });
  }

  const onChangeCity = (value) => {
    formik.setFieldValue('city', value);
    setSelectedCity(value)
  }

  const onClickBackButton = () => {
    setIsPageOne(true)
    setStepSchema({
      country: Yup.object().required('This field cannot be left blank.'),
      city: Yup.object().required('This field cannot be left blank.'),
    })
  }

  const onClickPaypal = async () => {
    await fetch(`${process.env.API_URL}/order/generate_order_token`)
          .then(r => r.json())
          .then(data => {
            setSendData({
              ...selectedList, 
              formData: formik.values, 
              total_price: Number(productPrice) + Number(selectedCountry.cargo_price) + Number(settings.service_fee),
              token: data.Result
            })
          });
  }

  const onApprovePaypal = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details.status === 'COMPLETED') {
        setPaypalResponse({data, details})
      }
    });
  }

  useEffect(() => {
    if (paypalResponse) {
      setSendData({...sendData, paypal_data: paypalResponse})
      setIsSuccess(true)
      document.querySelector('aside').scrollTo(0, 0)
      window.scrollTo({ top: 0, behavior: 'smooth' });

      fetch(`${process.env.API_URL}/order/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...sendData, paypal_data: paypalResponse})
      })
      .then(r => r.json())
      .then(data => {
        console.log(data.Result)
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paypalResponse])

  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const delayMonth = new Date(new Date().getTime()+(70*24*60*60*1000))
  const month = delayMonth.getMonth() == 11 ? new Date(delayMonth.getFullYear() + 1, 0, 1) : new Date(delayMonth.getFullYear(), delayMonth.getMonth() + 1, 1);
  const month1 = formatter.format(delayMonth);
  const month2 = formatter.format(month);

  return (
    <PayPalScriptProvider options={{ 'client-id': process.env.CLIENT_ID }}>
      <section className={styles['customize']}>
        <div className={styles['customize__logo']}><Logo /></div>

        {isPageOne && <div className={classNames(styles['head'], styles['head--title'], 'only-mobile')}>
          <h1>Serai One</h1>
          <p>Est. Delivery: {month1} - {month2} {delayMonth.getFullYear()}</p>
          <span onClick={() => setIsShowDetail(true)}>Learn about materials</span>
        </div>}

        <div className={styles['content']}>
          {!isPageOne &&<div className={styles['carousel']}>
            <Carousel data={carousel} className={classNames({'carousel__slider--list': !isSuccess})} />
            {!isSuccess && <SelectedList data={summarycontents} className={styles['selected-list']} /> }
          </div>
          }

          {isPageOne && 
            <>
              <Image src={bigImg} width={1388} height={980} alt={'Serai One'} priority className='only-desktop' onLoadingComplete={() => setLoading(false)} />
              <Image src={exteriorImg} width={1388} height={980} alt={'Serai One'} priority className='only-mobile' onLoadingComplete={() => setLoading(false)} />
            </>
          }
        </div>

        <aside className={styles['custom']}>
          <form onSubmit={formik.handleSubmit} noValidate>
            {isPageOne && <>
              <div className={classNames(styles['head'], 'only-desktop')}>
                <h1>Serai One</h1>
                <p>Est. Delivery: {month1} - {month2} {delayMonth.getFullYear()}</p>
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
                    {colorImg && <Image src={colorImg} width={1388} height={980} alt={'Interior Colors'} onLoadingComplete={() => setLoading(false)} />}
                  </div>
                  
                  <CustomTitle 
                    page={'2/6'}
                    title={'Interior'}
                    desc={'Ut vel purus aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.'}
                    more
                    onClick={() => onClickMore('interior')}
                  />
                  <CustomListRadio data={colors} onChange={(item, checklist, radioListObj) => handleChangeColor(item, checklist, radioListObj)} />

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
                      options={countries}
                      field={'Country'}
                      instanceId='countries'
                      required
                      value={selectedCountry}
                      onChange={(value) => onChangeCountry(value)}
                      errorMessage={formik.errors.country}
                      className={classNames({'is-invalid': formik.touched.country && formik.errors.country})}
                    />
                  </div>

                  <div className='form-group'>
                    <FormSelect 
                      options={cityList}
                      field={'City'}
                      instanceId='cities'
                      required
                      value={selectedCity}
                      onChange={(value) => onChangeCity(value)}
                      errorMessage={formik.errors.city}
                      className={classNames({'is-invalid': formik.touched.city && formik.errors.city})}
                    />
                  </div>
                  <div className='form-group-buttons'>
                    <Button text={'Next'} className={styles['button']} button />
                  </div>

                  <div className={styles['country-note']}>
                    <h5>Order Your Serai One</h5>
                    <h6>Est. Delivery: {month1} - {month2} {delayMonth.getFullYear()}</h6>
                  </div>
                </div>
              </div>

              <div className={styles['foot']}>
                <div className={styles['foot__title']}>Total Price:</div>
                <div className={styles['foot__total']}>${new Intl.NumberFormat().format(productPrice)}</div>
              </div>
            </> }

            {!isPageOne && <>
                {!isSuccess && <div className={styles['head']}>
                  <div className={styles['head__button']} onClick={() => onClickBackButton()}>
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
                      icon='check'
                      title={'Order Confirmed'}
                      desc={'Selected Product Specifications'}
                    /> }
                    
                    {isError && <CustomTitle 
                      icon='times'
                      title={'Order Confirmed'}
                      desc={'Selected Product Specifications'}
                      button
                      onClick={() => onClickBackButton()}
                    /> }

                    <div className={styles['basket']}>
                      <table>
                        <tbody>
                          <tr>
                            <th>Exterior</th>
                            <td>{selectedList.exteriors.title}</td>
                          </tr>
                          <tr>
                            <th className={styles['no-border']}>Interior</th>
                            <td className={styles['no-border']}>&nbsp;</td>
                          </tr>
                          {
                            selectedList.interiors?.colors?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.product_type === 'walls_color' ? 'Wall' : 'Floors'}</td>
                                  <td>{item.product_title}</td>
                                </tr>
                              )
                            })
                          }
                          <tr>
                            <th>Appliances</th>
                            <td>{selectedList.interiors.appliances.title}</td>
                          </tr>
                          <tr>
                            <th>Mind</th>
                            <td>{selectedList.interiors.mind.title}</td>
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
                            <td>${new Intl.NumberFormat().format(settings.product_price)}</td>
                          </tr>
                          {
                            selectedList.interiors?.colors?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.product_type === 'walls_color' ? 'Wall' : 'Floors'} {item.product_title}</td>
                                  <td>${new Intl.NumberFormat().format(item.price)}</td>
                                </tr>
                              )
                            })
                          }
                          <tr>
                            <td>Apliances {selectedList.interiors.appliances.title}:</td>
                            <td>${new Intl.NumberFormat().format(selectedList.interiors.appliances.price)}</td>
                          </tr>
                          <tr>
                            <td>Mind {selectedList.interiors.mind.title}:</td>
                            <td>${new Intl.NumberFormat().format(selectedList.interiors.mind.price)}</td>
                          </tr>
                          <tr>
                            <td>Total:</td>
                            <td><b>${new Intl.NumberFormat().format(productPrice)}</b></td>
                          </tr>
                        </tbody>
                      </table>}
                    </div>

                    <div className={styles['summary-box']}>
                      <table>
                        <tbody>
                          <tr>
                            <td>Home Price:</td>
                            <td>${new Intl.NumberFormat().format(productPrice)}</td>
                          </tr>
                          <tr>
                            <td>Destination Fee:</td>
                            <td>${new Intl.NumberFormat().format(selectedCountry.cargo_price)}</td>
                          </tr>
                          <tr>
                            <td>Order Fee:</td>
                            <td>${new Intl.NumberFormat().format(settings.service_fee)}</td>
                          </tr>
                          <tr>
                            <td>Your Model Serai One:<br /><span>Excluding taxes & other fees</span></td>
                            <td><b>${new Intl.NumberFormat().format(Number(productPrice) + Number(selectedCountry.cargo_price) + Number(settings.service_fee))}</b></td>
                          </tr>
                          <tr>
                            <td>Amount of Payment ({settings.price_ratio}%):</td>
                            <td><b>${new Intl.NumberFormat().format(((Number(productPrice) + Number(selectedCountry.cargo_price) + Number(settings.service_fee)) * settings.price_ratio) / 100)}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    {!isSuccess && <div className={styles['form']}>
                      
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
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue('phone', value)}
                            errorMessage={formik.errors.phone}
                            className={classNames({'is-invalid': formik.touched.phone && formik.errors.phone})}
                          />
                        </div>

                        <div className='form-group'>
                          <FormInput 
                            field='E-Mail'
                            type='email' 
                            required
                            errorMessage={formik.errors.email}
                            {...formik.getFieldProps('email')}
                            className={classNames({'is-invalid': formik.touched.email && formik.errors.email})}
                          />
                        </div>

                        <h4>Address</h4>

                        <div className='form-group'>
                          <FormSelect 
                            options={countries}
                            field={'Country'}
                            instanceId='countries'
                            required
                            value={selectedCountry}
                            onChange={(value) => onChangeCountry(value)}
                            errorMessage={formik.errors.country}
                            className={classNames({'is-invalid': formik.touched.country && formik.errors.country})}
                          />
                        </div>
                        <div className='form-group'>
                          <FormSelect 
                            options={cityList}
                            field={'City'}
                            instanceId='cities'
                            required
                            value={selectedCity}
                            onChange={(value) => onChangeCity(value)}
                            errorMessage={formik.errors.city}
                            className={classNames({'is-invalid': formik.touched.city && formik.errors.city})}
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
                          <FormCheckbox
                            label='<u>Lorem ipsum</u> dolor sit amet.'
                            onChange={() => handleChangePermission()}
                            checked={checkboxAllow}
                            errorMessage={formik.errors.permission}
                            name={'permission'}
                            required
                            className={classNames({'is-invalid': formik.touched.permission && formik.errors.permission})}
                            onClickText={() =>  setAgreementModal(true)}
                          />
                        </div>
                        <div className='form-group-buttons'>
                          {!paypal && <Button img={'/images/paypal.svg'} button className={styles['button']} paypal /> }
                          {paypal && <PayPalButtons 
                            className={styles['button']}
                            style={{ 
                              layout: 'horizontal',
                              color:  'blue',
                              height: 53,
                            }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [{
                                  'amount':{
                                    'currency_code':'USD',
                                    'value': ((Number(productPrice) + Number(selectedCountry.cargo_price) + Number(settings.service_fee)) * settings.price_ratio) / 100
                                  }
                                }]
                              });
                            }}
                            onClick={() => onClickPaypal()}
                            onApprove={(data, actions) => onApprovePaypal(data, actions)}
                            onError={() => setIsError(true)}
                          /> }
                        </div>
                    </div> }
                  </div>
                </div>
              </>
            }
          </form>
        </aside>
      </section>

      {loading && <div className={styles['loading']}>
        <Image src={'/images/logo/logo-2.svg'} width={100} height={100} alt={'Loading'} priority />
      </div> }

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
    </PayPalScriptProvider>
  )
}

export async function getStaticProps() {
  const detailedinfo = await fetch(`${process.env.API_URL}/detailedinfo`).then(r => r.json()).then(data => data.Result);
  const exteriors = await fetch(`${process.env.API_URL}/exteriors`).then(r => r.json()).then(data => data.Result);
  const settings = await fetch(`${process.env.API_URL}/settings`).then(r => r.json()).then(data => data.Result);
  const interiors = await fetch(`${process.env.API_URL}/interiors`).then(r => r.json()).then(data => data.Result);
  const interiors_more_info_images = await fetch(`${process.env.API_URL}/interiors_more_info_images`).then(r => r.json()).then(data => data.Result);
  const exteriors_more_info_images = await fetch(`${process.env.API_URL}/exteriors_more_info_images`).then(r => r.json()).then(data => data.Result);
  const summarycontents = await fetch(`${process.env.API_URL}/summarycontents`).then(r => r.json()).then(data => data.Result);
  const countries = await fetch(`${process.env.API_URL}/countries`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      detailedinfo,
      exteriors,
      settings,
      interiors,
      interiors_more_info_images,
      exteriors_more_info_images,
      summarycontents,
      countries
    },
    revalidate: 10,
  }
}

