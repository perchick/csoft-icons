import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Header from '@components/Header'
import IconLinkBack from '@components/IconPage/IconLinkBack'
import IconTags from '@components/IconPage/IconTags'
import { getIconImage } from '@services/getIconData'
import { getIconTags } from '@services/getIconData'
import { IconArray } from '@services/context'
import { 
	COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, 
	COLOR_7, COLOR_8, COLOR_9, COLOR_10, COLOR_11, COLOR_12, 
	COLOR_13, COLOR_14, GENERAL_COLOR, 
	GENERAL_SIZE, ULTRA_SMALL, SMALL, MEDIOM } from '@constants/constants'

import corner_top_left from '@static/corner-top-left.svg'
import corner_top_right from '@static/corner-top-right.svg'
import corner_bottom_left from '@static/corner-bottom-left.svg'
import corner_bottom_right from '@static/corner-bottom-right.svg'
import pattern_alpha_light from '@static/pattern-alpha-light.svg'
import pattern_alpha_dark from '@static/pattern-alpha-dark.svg'

import cn from 'classnames'
import styles from './IconPage.module.css'

const IconPage = () => {
	// const inlineSVG = `<svg width="19" height="19" viewBox="0 0 190 190" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 91C0 96 2 100 5 103L79 178C86 184 97 184 103 178L175 106C181 100 181 89 175 82L101 8C97 5 93 3 89 3H17C7 3 0 10 0 19V91ZM39 25C49 25 56 33 56 42 56 51 49 59 39 59 30 59 23 51 23 42 23 33 30 25 39 25Z" fill="firebrick"/></svg>`
	window.scrollTo(0, 0)

	const [svgIcon, setSvgIcon] = useState(null)
	const [newIconColor, setNewIconColor] = useState(GENERAL_COLOR)
	const [newIconBg, setNewIconBg] = useState(pattern_alpha_light)
	// const [currentSize, setCurrentSize] = useState(GENERAL_SIZE)
	const [newSize, setSize] = useState(GENERAL_SIZE)

	const { iconArray, setIconArray } = useContext(IconArray)
	const clickedIdIcon = useParams().id
	
	let iconTitle = null
	let iconImage = null
	let iconTags = null
	let iconInfo = null
	
	if (iconArray) {
		for (let index = 0; index < iconArray.length; index++) {
			if(iconArray[index].id === clickedIdIcon){
				iconTitle = iconArray[index].title
				iconImage = getIconImage(clickedIdIcon)
				iconTags = getIconTags(iconArray[index].tags)
				iconInfo = ([
					{ title: 'Id', data: iconArray[index].id },
					{ title: 'Title', data: iconArray[index].title },
					{ title: 'Modificated', data: iconArray[index].modificated },
				])
			}			
		}
		getSvgData(iconImage)
	}

	async function getSvgData(url) {
		let response = await fetch(url)
		if (response.ok) {
			let data = await response.text()
			setSvgIcon(data)
			return data
		} else {
			alert('error', response.status);
		}
	}

	const modificatedSvg = () => {
		return svgIcon.replace(new RegExp(GENERAL_COLOR,"gi"), newIconColor)
	}
	
	const svg64 = (svgData) =>  {
		return window.btoa(svgData)
	}
	
	const iconStyle = (data) => {
		return {
			width: newSize + 'px',
			height: newSize + 'px',
			backgroundImage: "url('data:image/svg+xml;base64," + svg64(data) + "')"
		}
	}
	const iconContainerStyle = () => {
		return {
			width: 'calc(' + newSize + 'px + 12px)',
			height: 'calc(' + newSize + 'px + 12px)',
			backgroundImage: 'url(' + newIconBg + ')'
		}
	}
	const resultStyle = () => {
		return {
			width: 'calc(' + newSize + 'px + 24px)',
			height: 'calc(' + newSize + 'px + 24px)',
		}
	}

	function handleFormChange(e) {
		switch (e.target.value) {
			case '1':
				setNewIconColor(COLOR_1)
				setNewIconBg(pattern_alpha_dark)			
				break
			case '2':
				setNewIconColor(COLOR_2)
				setNewIconBg(pattern_alpha_light)
				break
			case '3':
				setNewIconColor(COLOR_3)
				setNewIconBg(pattern_alpha_light)		
				break
			case '4':
				setNewIconColor(COLOR_4)
				setNewIconBg(pattern_alpha_dark)		
				break
			case '5':
				setNewIconColor(COLOR_5)
				setNewIconBg(pattern_alpha_dark)		
				break
			case '6':
				setNewIconColor(COLOR_6)
				setNewIconBg(pattern_alpha_light)		
				break
			case '7':
				setNewIconColor(COLOR_7)
				setNewIconBg(pattern_alpha_light)		
				break
			case '8':
				setNewIconColor(COLOR_8)
				setNewIconBg(pattern_alpha_dark)			
				break
			case '9':
				setNewIconColor(COLOR_9)
				setNewIconBg(pattern_alpha_light)	
				break
			case '10':
				setNewIconColor(COLOR_10)
				setNewIconBg(pattern_alpha_light)		
				break
			case '11':
				setNewIconColor(COLOR_11)
				setNewIconBg(pattern_alpha_light)			
				break
			case '12':
				setNewIconColor(COLOR_12)
				setNewIconBg(pattern_alpha_light)		
				break
			case '13':
				setNewIconColor(COLOR_13)
				setNewIconBg(pattern_alpha_dark)		
				break
			case '14':
				setNewIconColor(COLOR_14)
				setNewIconBg(pattern_alpha_dark)			
				break

			default:
				setNewIconColor(GENERAL_COLOR)
				break;
		}
	}

	return (
		<>		
			<div className="wrapper_grey_page">
				<Header searchText={""}/>

				<div className={"content_width_middle padding_top_bottom_l"}>

					<IconLinkBack />

					<div className={styles.icon_page_flex}>	

						<section className={styles.container_info}>
							{iconInfo && 
								<div>
									<h3>Файл #{iconInfo[0].data}</h3>
									<span className="font_ultra">обновлен</span>
									<b className={"font_ultra margin_left_ultra_small"} >{iconInfo[2].data}</b>
								</div>
							}
							{iconImage && 
								<img className={"icon_container__image padding_top_bottom_m"} src={iconImage} alt={iconTitle} />
							}
						</section>
						
						<section>
							<form className="margin_bottom_m">
								<div className="margin_bottom_s">
									<span className="font_ultra">цвет:</span>
									<b className={"font_ultra margin_left_ultra_small"}>{newIconColor}</b>
								</div>
								<input className={cn(styles.color1, styles.input_dark)} type="radio" name="radio" value="1" onChange={handleFormChange} />	
								{/* <input className={cn(styles.color14, styles.input_dark)} type="radio" name="radio" value="14" onChange={handleFormChange} /> */}
								{/* <input className={cn(styles.color4, styles.input_dark)} type="radio" name="radio" value="4" onChange={handleFormChange} /> */}
								{/* <input className={cn(styles.color5, styles.input_dark)} type="radio" name="radio" value="5" onChange={handleFormChange} /> */}
								<input className={cn(styles.color12, styles.input_dark)} type="radio" name="radio" value="12" onChange={handleFormChange} />
								<input className={cn(styles.color9, styles.input_dark)} type="radio" name="radio" value="9" onChange={handleFormChange} />
								<input className={cn(styles.color7, styles.input_light)} type="radio" name="radio" value="7" onChange={handleFormChange} />
								<input className={cn(styles.color10, styles.input_light)} type="radio" name="radio" value="10" onChange={handleFormChange} />
								<input className={cn(styles.color2, styles.input_light)} type="radio" name="radio" value="2" onChange={handleFormChange} />
								<input className={cn(styles.color3, styles.input_light)} type="radio" name="radio" value="3" onChange={handleFormChange} />
								{/* <input className={cn(styles.color13, styles.input_dark)} type="radio" name="radio" value="13" onChange={handleFormChange} /> */}
								<input className={cn(styles.color11, styles.input_dark)} type="radio" name="radio" value="11" onChange={handleFormChange} />		
							</form>

							<div className="margin_bottom_m">
								<div className="font_ultra margin_bottom_s">результат:</div>
								{/* <img className={styles.test} src={`data:image/svg+xml;charset=utf-8,${inlineSVG}`} alt="" />
								<img src={`data:image/svg+xml;charset=utf-8,${inlineSVG}`}/> */}
								
								<div className={styles.result} style={resultStyle()}>
									<div className={styles.result__corners_container}>
										<img src={corner_top_left} alt="рамка" />
										<img src={corner_top_right} alt="рамка" />
									</div>
									<div className={styles.result__icon_container} style={iconContainerStyle()}>
										{svgIcon && <div style={iconStyle(modificatedSvg())}></div>}
									</div>
									<div className={styles.result__corners_container}>
										<img src={corner_bottom_left} alt="рамка" />
										<img src={corner_bottom_right} alt="рамка" />
									</div>
								</div>
							</div>


							<div className="font_ultra margin_bottom_s">теги:</div>
							{iconTags && <IconTags iconTags={iconTags} />}	
						</section>
					</div>
				</div>
			</div>
		</>
	)
}

export default IconPage