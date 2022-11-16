import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';

import * as Yup from 'yup'
import {useFormik} from 'formik'

import styles from '../assets/styles/Customize.module.scss'
import { Logo, Detail, CustomTitle, CustomListButton, CustomListRadio, FormSelect, Button, Icon, FormInput, PhoneFormInput, Carousel, SelectedList, Modal, ModalCarousel, FormCheckbox } from '../components';

export default function Customize({exteriors, interiors, detailedinfo, settings, exteriors_more_info_images, interiors_more_info_images}) {
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

  useEffect(() => {
    document.querySelector('html').classList.remove('snap');
    document.querySelector('html').classList.remove('disable-scroll')
  }, [])

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
    fetch(`https://serai.ozanuzer.com/api/variant_images`, {
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
  
  const handleChangeColor = async (item, checklist) => {
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
      setCarousel([...carousel, { image: data.Result.image, title: 'colors' }])
    });

    const interiors = selectedList.interiors;
    const colors = interiors.colors;

    colors.map(color => {
      if (color.product_type === item.product_type) {
        color['id'] = item.id;
        color['lastPrice'] = item.lastPrice;
        color['newPrice'] = item.newPrice;
        color['price'] = item.price; 
        color['product_id'] = item.product_id;
        color['product_title'] = item.product_title;
      }
    })

    allList['interiors'].colors.push(colors)
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
  
  const country = [
    { id: 1, label: 'Türkiye' },
    { id: 2, label: 'Sweden' },
    { id: 3, label: 'England' },
    { id: 4, label: 'Germany' },
  ]

  const selectedBoxList = [
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
            {!isSuccess && <SelectedList data={selectedBoxList} className={styles['selected-list']} /> }
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
                  {console.log(selectedList)}
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
                          <td>${settings.product_price}</td>
                        </tr>
                        {
                          selectedList.interiors?.colors?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.product_title}</td>
                                <td>${item.price}</td>
                              </tr>
                            )
                          })
                        }
                        <tr>
                          <td>Apliances {selectedList.interiors.appliances.title}:</td>
                          <td>${selectedList.interiors.appliances.price}</td>
                        </tr>
                        <tr>
                          <td>Mind {selectedList.interiors.mind.title}:</td>
                          <td>${selectedList.interiors.mind.price}</td>
                        </tr>
                        <tr>
                          <td>Total:</td>
                          <td><b>${productPrice}</b></td>
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
                          <td>${settings.product_price}</td>
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
                          <td><b>${productPrice}</b></td>
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

  return {
    props: {
      detailedinfo,
      exteriors,
      settings,
      interiors,
      interiors_more_info_images,
      exteriors_more_info_images,
    },
    revalidate: 10,
  }
}

