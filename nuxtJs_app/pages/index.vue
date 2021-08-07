<template>
	<div class='indexPage'>
		<!--产品列表面板，和地图-->
		<div class='productModel'>
			<div class='productListBoard'>
				<!--产品、方案、配件列表-->
				<transition name='xx'>
					<div v-show='is_show_all_list' class='listBoard'>
						<!--顶部headerTab切换-->
						<div class='baseBoardTop boardTypeTab xx-f-16'>
							<div class='perTab xx-pointer' :class='{activedTab: current_tab_type === "allSolutionTab"}' @click='triggerTab("allSolutionTab")'>
								解决方案
								<!-- <span class='iconfont iconwujiaoxing' /> -->
							</div>
							<div class='perTab xx-pointer' :class='{activedTab: current_tab_type === "allProductTab"}' @click='triggerTab("allProductTab")'>
								全部产品
							</div>
						</div>
						<!--方案列表-->
						<div v-show='current_tab_type === "allSolutionTab"' class='normalList solutionList'>
							<!-- <div class='perSolution xx-radius' @click='openSolutionDetail'>
								<div class='solutionPic'>
									<img src=''>
								</div>
								<div class='sketch'>
									<div class='baseName solutionName xx-elli'>
										农副食品解决方案农副食品解决方案农副食品解决方案农副食品解决方案
									</div>

									<div class='baseDetailDes xx-elli'>
										蛋液、淀粉、蔬菜加工品等包装解决方案
									</div>
									<div class='visiblePrice soVisiblePrice'>
										<span class='productPrice xx-f-20'>￥111</span>
									</div>
								</div>
							</div>
							<div class='perSolution xx-radius' @click='openSolutionDetail'>
								<div class='solutionPic'>
									<img src=''>
								</div>
								<div class='sketch'>
									<div class='part1'>
										<div class='baseName solutionName xx-elli'>
											农副食品解决方案农副食品解决方案农副食品解决方案农副食品解决方案
										</div>
									</div>
									<div class='baseDetailDes xx-elli'>
										蛋液、淀粉、蔬菜加工品等包装解决方案
									</div>
									<div class='loginVisibleButton soLoginVisibleButton xx-f-12 xx-pointer' @click.stop='triggerLogin'>
										￥登陆可见
									</div>
								</div>
							</div> -->

							<div v-for='per_scheme in scheme_list' :key='per_scheme.id' class='perSolution xx-radius' @click='openSolutionDetail(per_scheme.id)'>
								<div class='solutionPic'>
									<template v-for='per_img in per_scheme.fileList'>
										<img v-if='per_img.classification === "1"' :key='per_img.id' :src='per_img.fileUrl'>
									</template>
								</div>
								<div class='sketch'>
									<div class='part1'>
										<div class='baseName solutionName xx-elli'>
											{{ per_scheme.name }}
										</div>
										<div class='baseDetailDes xx-elli'>
											{{ per_scheme.introduce }}
										</div>
										<div v-if='!per_scheme.programmeList[0].programmePrice' class='loginVisibleButton soLoginVisibleButton xx-f-12 xx-pointer'>
											￥登陆可见
										</div>
										<div v-if='per_scheme.programmeList[0].programmePrice' class='visiblePrice soVisiblePrice'>
											<span class='productPrice xx-f-20'>￥{{ per_scheme.programmeList[0].programmePrice }} </span>
											<span>{{ per_scheme.programmeList[0].priceUnit }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--产品列表-->
						<div v-show='current_tab_type === "allProductTab"' class='normalList allProductList'>
							<div class='productGroup'>
								<!--全部产品-->
								<!-- <div class='perProduct xx-radius xx-mt-1 xx-pointer' @click='openProductDetail'>
									<img src='' class='productImg'>
									<div class='sketch'>
										<p class='baseName productName xx-elli'>
											产品名1 <span class='sTypeName xx-f-14'>折叠吨箱IBC</span>
										</p>
										<div class='visiblePrice xx-elli'>
											<span class='productPrice xx-f-20'>￥111</span> /套/趟（40天）
										</div>
									</div>
								</div>
								<div class='perProduct xx-radius xx-mt-1 xx-pointer' @click='openProductDetail'>
									<img src='' class='productImg'>
									<div class='sketch'>
										<p class='baseName productName xx-elli'>
											产品名2 <span class='sTypeName xx-f-14'>折叠吨箱IBC</span>
										</p>
										<div class='loginVisibleButton productLoginVisibleButton xx-f-12 xx-pointer'>
											￥登陆可见
										</div>
									</div>
								</div> -->
								<div v-for='per_product in product_list.dataList' :key='per_product.id' class='perProduct xx-radius xx-mt-1 xx-pointer' @click='openProductDetail(per_product.id, "product")'>
									<template v-for='per_img in per_product.fileList'>
										<img v-if='per_img.classification === "1"' :key='per_img.id' :src='per_img.fileUrl' class='productImg'>
									</template>
									<div class='sketch'>
										<p class='baseName productName xx-elli'>
											{{ per_product.productName }} <span v-if='per_product.seriesName' class='sTypeName xx-f-14'>{{ per_product.seriesName }}</span>
										</p>
										<div v-if='!per_product.groupDTOList[0].price' class='loginVisibleButton xx-f-12 xx-pointer' @click.stop='triggerLogin'>
											￥登陆可见
										</div>
										<div v-if='per_product.groupDTOList[0].price' class='visiblePrice xx-elli'>
											<span class='productPrice xx-f-20'>￥{{ per_product.groupDTOList[0].price }}</span> {{ per_product.groupDTOList[0].priceUnit }}
										</div>
									</div>
								</div>
							</div>
							<!--全部配件-->
							<p class='groupName xx-f-16'>
								产品配件
							</p>
							<div v-for='per_fitting in fitting_list.dataList' :key='per_fitting.id' class='perFitting xx-radius xx-mt-1 xx-pointer' @click='openProductDetail(per_fitting.id, "fitting")'>
								<template v-for='per_img in per_fitting.partsFiles'>
									<img v-if='per_img.classification === "1"' :key='per_img.id' :src='per_img.fileUrl' class='fittingImg'>
								</template>
								<div class='fittingSketch'>
									<p class='baseName productName xx-elli'>
										{{ per_fitting.name }}
									</p>
									<div v-if='per_fitting.price' class='visiblePrice'>
										<span class='productPrice xx-f-20'>￥{{ per_fitting.price }}</span> /件
									</div>
									<div v-if='!per_fitting.price' class='loginVisibleButton fittingLoginVisibleButton xx-f-12 xx-pointer' @click.stop='triggerLogin'>
										￥登陆可见
									</div>
								</div>
							</div>
							<!-- <div v-for='per_fitting in fitting_list' :key='per_fitting.id' class='perProduct xx-radius xx-mt-1 xx-pointer'>
								<img :src='per_product.fileUrl' class='productImg'>
								<div class='sketch'>
									<p class='baseName productName xx-elli'>
										{{ per_fitting.partsName }} <span class='sTypeName xx-f-14'>{{ per_fitting.categoryName }}</span>
									</p>
									<p class='baseDetailDes baseProDetailDes xx-elli'>
										内容积1024L，可折叠，支持九字内容积1024L，可折叠，支持九字
									</p>
									<div class='loginVisibleButton xx-f-12 xx-pointer'>
										￥登陆可见
									</div>
									<div class='visiblePrice'>
										<span class='redPrice productPrice xx-f-20'>￥{{ per_fitting.price }}</span> {{ per_fitting.specifications }}
									</div>
								</div>
							</div> -->
						</div>
					</div>
				</transition>

				<!--方案详情-->
				<transition name='xx'>
					<div v-show='is_show_solu_detail' class='baseDetailBoard solutionDetailBoard'>
						<div class='banner'>
							<el-carousel trigger='click' height='232px'>
								<el-carousel-item>
									<img class='bannerPic' src='@/assets/imgs/login_banner_01.png'>
								</el-carousel-item>
								<el-carousel-item>
									<img class='bannerPic' src='@/assets/imgs/login_banner_02.png'>
								</el-carousel-item>
								<el-carousel-item>
									<img class='bannerPic' src='@/assets/imgs/login_banner_03.png'>
								</el-carousel-item>
							</el-carousel>
							<svg class='icon closeDetailBoard' title='关闭详情' aria-hidden='true' @click='closeSolutionDetail'>
								<use xlink:href='#icon-a-Group26' />
							</svg>
						</div>
						<div v-if='solution_detail' class='solutionDetails'>
							<div class='baseName solutionWholeName xx-elli'>
								{{ solution_detail.name }}
							</div>
							<div class='baseDetailWholeDes xx-elli'>
								{{ solution_detail.introduce }}
							</div>
							<!--登录后可见的价格-->
							<div v-if='solution_detail.programmeList' class='detailBoardPrice xx-mt-1'>
								<div class='priceLeft'>
									<span class='redPrice productPrice xx-f-20'>￥{{ current_solution.programmePrice }}</span>{{ current_solution.priceUnit }}
								</div>
								<span>*超一口价区域运费另算</span>
							</div>
							<!--方案详细-->
							<div class='schemeTitle xx-f-16 xx-mt-3'>
								解决方案组成
							</div>
							<div v-if='solution_detail.setMealProductDTO' class='schemeBox xx-mt-2 xx-d-flex'>
								<template v-for='per_detail_img in solution_detail.setMealProductDTO.fileList'>
									<img v-if='per_detail_img.classification === "2"' :key='per_detail_img.id' class='schemeBoxPic xx-radius' src='per_detail_img.fileUrl'>
								</template>
								<div class='schemeBoxDes xx-ml-2'>
									<div class='schemeBoxTitle xx-f-16'>
										{{ solution_detail.setMealProductDTO.relationName }}
									</div>
									<div class='schemeBoxSubTitle xx-mt-1'>
										{{ solution_detail.setMealProductDTO.introduce }}
									</div>
								</div>
							</div>
							<!--方案组成-->
							<!--三角-->
							<i class='triagle el-icon-caret-top' />
							<div class='schemeBoxDetail xx-radius'>
								<el-select v-model='current_solution' size='small' class='sTypeSelect'>
									<el-option
										v-for='item in solution_detail.programmeList'
										:key='item.id'
										:label='item.programmeName'
										:value='item'
									/>
								</el-select>
								<!--方案内产品列表-->
								<div class='schemeBoxList'>
									<div v-if='current_solution' class='perBoxDetail xx-mt-2 xx-d-flex'>
										<template v-for='item in current_solution.fileList'>
											<img v-if='item.classification === "2"' :key='item.id' class='schemeSBoxPic xx-radius' :src='item.fileUrl'>
										</template>
										<div class='schemeBoxDes xx-ml-2'>
											<div class='schemeBoxTitle'>
												{{ current_solution.relationName }}
											</div>
											<div class='schemeSBoxSubTitle'>
												???
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--提交按钮组-->
						<div class='orderButtons'>
							<div class='baseButton freeTrialButton xx-radius' @click='openLeaveMessage'>
								免费试用
								<div class='top100Tips xx-f-10'>
									限前100名
								</div>
							</div>
							<div class='baseButton orderButton xx-ml-2 xx-radius' @click='openOrdering'>
								立即下单
							</div>
						</div>
					</div>
				</transition>

				<!--产品详情 || 配件详情-->
				<transition name='xx'>
					<div v-show='is_show_pro_detail' class='baseDetailBoard productDetailBoard'>
						<div v-if='detail_type === "product"' class='banner'>
							<el-carousel trigger='click' height='232px'>
								<template v-for='per_img in product_detail.fileList'>
									<el-carousel-item :key='per_img.id'>
										<img v-if='per_img.classification === "2"' class='bannerPic' src='per_img.fileUrl'>
									</el-carousel-item>
								</template>
							</el-carousel>
							<svg class='icon closeDetailBoard' title='关闭详情' aria-hidden='true' @click='closeProductDetail'>
								<use xlink:href='#icon-a-Group26' />
							</svg>
						</div>
						<div v-if='detail_type === "product"' class='productDetails'>
							<div v-if='product_detail && product_detail.productName' class='baseName productName xx-elli'>
								{{ product_detail.productName }} <span v-if='product_detail.seriesName' class='sTypeName xx-f-14'>{{ product_detail.seriesName }}</span>
							</div>
							<p v-if='product_detail && product_detail.introduce' class='proDetailDes xx-elli'>
								{{ product_detail.introduce }}
							</p>
							<!--价格-->
							<template v-if='product_detail && product_detail.groupDTOList && product_detail.groupDTOList[0].price'>
								<div class='detailBoardPrice xx-mt-1'>
									<div class='priceLeft'>
										<span class='productPrice xx-f-20'>￥{{ product_detail.groupDTOList[0].price }}</span>{{ product_detail.groupDTOList[0].priceUnit }}
									</div>
									<span class='xx-f-12'>*超一口价区域运费另算</span>
								</div>
							</template>
							<!--产品参数-->
							<div class='proParams'>
								<p class='paramsTitle xx-f-16 xx-mt-3'>
									产品参数 <i class='el-icon-warning' />
								</p>
								<template v-for='per_detail_img in product_detail.fileList'>
									<img v-if='per_detail_img.classification === "3"' :key='per_detail_img.id' class='paramDetailImg' src='per_detail_img.fileUrl'>
								</template>
							</div>
						</div>

						<div v-if='detail_type === "fitting"' class='banner'>
							<el-carousel trigger='click' height='232px'>
								<template v-for='per_img in fitting_detail.fileList'>
									<el-carousel-item :key='per_img.id'>
										<img v-if='per_img.classification === "2"' class='bannerPic' src='per_img.fileUrl'>
									</el-carousel-item>
								</template>
							</el-carousel>
							<svg class='icon closeDetailBoard' title='关闭详情' aria-hidden='true' @click='closeProductDetail'>
								<use xlink:href='#icon-a-Group26' />
							</svg>
						</div>
						<div v-if='detail_type === "fitting"' class='productDetails'>
							<div v-if='fitting_detail && fitting_detail.partsName' class='baseName productName xx-elli'>
								{{ fitting_detail.partsName }}
							</div>
							<p v-if='fitting_detail && fitting_detail.purpose' class='proDetailDes xx-elli'>
								{{ fitting_detail.purpose }}
							</p>
							<!--价格-->
							<template v-if='fitting_detail && fitting_detail.price'>
								<div class='detailBoardPrice xx-mt-1'>
									<div class='priceLeft'>
										<span class='productPrice xx-f-20'>￥{{ fitting_detail.price }}</span>件
									</div>
									<span class='xx-f-12'>*超一口价区域运费另算</span>
								</div>
							</template>
							<!--产品参数-->
							<div class='proParams'>
								<p class='paramsTitle xx-f-16 xx-mt-3'>
									配件参数 <i class='el-icon-warning' />
								</p>
								<template v-for='per_detail_img in fitting_detail.partsFiles'>
									<img v-if='per_detail_img.classification === "3"' :key='per_detail_img.id' class='paramDetailImg' src='per_detail_img.fileUrl'>
								</template>
							</div>
						</div>
						<!--提交按钮组-->
						<div class='orderButtons'>
							<div class='baseButton freeTrialButton xx-radius' @click='openLeaveMessage'>
								免费试用
								<div class='top100Tips xx-f-10'>
									限前100名
								</div>
							</div>
							<div class='baseButton orderButton xx-ml-2 xx-radius' @click='openOrdering'>
								立即下单
							</div>
						</div>
					</div>
				</transition>

				<!--下订单页-->
				<transition name='xx'>
					<div v-show='is_show_order' class='baseDetailBoard confirmOrderPage'>
						<div class='baseBoardTop routeBackTop xx-f-16'>
							<div class='baseBoardTopContent'>
								<i class='el-icon-back backIcon' />订单确认
							</div>
						</div>
						<!--地址tabs-->
						<div class='addressTabsmodel'>
							<div class='tabsGroup'>
								<el-tabs v-model='editableTabsValue' type='card' closable @tab-remove='removeTab'>
									<el-tab-pane
										v-for='(item) in editableTabs'
										:key='item.name'
										:label='item.title'
										:name='item.name'
									/>
								</el-tabs>
							</div>
							<i class='addNewAddress el-icon-circle-plus-outline' @click='addTab' />
						</div>
						<div class='orderingContent'>
							<!--送收货地址-->
							<section class='deliverAddr xx-mt-2'>
								<p class='desStr xx-f-16'>
									送收箱路线
								</p>
								<div class='inputAddrContainer xx-mt-2'>
									<div class='signText send xx-radius'>
										送
									</div>
									<div class='addrInputs'>
										<el-input v-model='input' class='addrInput' size='small' placeholder='从哪里发货（上游）' />
										<!--已存在的地址-->
										<div class='addressButton xx-f-12 xx-pointer'>
											<svg class='icon locationIcon' aria-hidden='true'>
												<use xlink:href='#icon-a-Group12' />
											</svg>
											地址簿
										</div>
										<el-input v-model='input' class='addrContactsInput' size='small' placeholder='请输入联系人' />
										<el-input v-model='input' class='addrPhoneInput' size='small' placeholder='请输入电话' />
										<div class='outlineTips xx-f-12'>
											*该地址已超出一口价区域
										</div>
									</div>
								</div>
								<div class='inputAddrContainer xx-mt-1'>
									<span class='signText receive xx-radius'>收</span>
									<div class='addrInputs'>
										<el-input v-model='input' class='addrInput' size='small' placeholder='从哪里收货（下游）' />
										<!--已存在的地址-->
										<div class='addressButton xx-f-12 xx-pointer'>
											<svg class='icon locationIcon' aria-hidden='true'>
												<use xlink:href='#icon-a-Group12' />
											</svg>
											地址簿
										</div>
										<el-input v-model='input' class='addrContactsInput' size='small' placeholder='请输入联系人' />
										<el-input v-model='input' class='addrPhoneInput' size='small' placeholder='请输入电话' />
										<div class='outlineTips xx-f-12'>
											*该地址已超出一口价区域
										</div>
									</div>
								</div>
							</section>
							<!--下单的商品信息-->
							<div class='schemeTitle xx-f-16 xx-mt-3'>
								商品信息
							</div>
							<div class='orderBox xx-mt-2 xx-d-flex'>
								<div class='orderBoxPicContainer xx-radius'>
									<img class='orderBoxPic' src='' alt=''>
								</div>
								<div class='orderSchemeBoxDes xx-ml-2'>
									<div class='schemeBoxTitle xx-f-16'>
										吨立方
									</div>
									<div class='orderSolutionInfo xx-mt-1'>
										<span class='orderSolutionPerPrice xx-f-16'>￥444</span> /套/趟（40天）
									</div>
									<div class='counterBar xx-d-flex'>
										<el-input-number
											v-model='num'
											class='countNum xx-radius'
											size='small'
											controls-position='right'
											:min='50'
											@change='changeOrderNum'
										/>
										<div class='countNumTips xx-f-12'>
											50套起订
										</div>
									</div>
								</div>
							</div>
							<!--方案组成-->
							<!--三角-->
							<i class='triagle el-icon-caret-top' />
							<div class='schemeBoxDetail orderSchemeBoxDetail xx-radius'>
								<!--方案内产品列表-->
								<div class='perBoxDetailContainer'>
									<div class='perBoxDetail xx-d-flex'>
										<!--产品图-->
										<div class='schemeMBoxPic xx-radius' />
										<!--描述-->
										<div class='orderSolutionDes xx-ml-2'>
											<div class='schemeBoxTitle'>
												吨方
											</div>
											<div class='schemeSBoxSubTitle'>
												折叠吨箱IBC
											</div>
										</div>
									</div>
									<!--数量-->
									<div class='perBoxDetailNum'>
										X 3件
									</div>
								</div>
								<div class='perBoxDetailContainer'>
									<div class='perBoxDetail xx-d-flex'>
										<!--产品图-->
										<div class='schemeSBoxPic xx-radius' />
										<!--描述-->
										<div class='orderSolutionDes xx-ml-3'>
											<div class='schemeBoxTitle'>
												吨方
											</div>
											<div class='schemeSBoxSubTitle'>
												折叠吨箱IBC
											</div>
										</div>
									</div>
									<!--数量-->
									<div class='perBoxDetailNum'>
										X 3件
									</div>
								</div>
								<div class='perBoxDetailContainer'>
									<div class='perBoxDetail xx-d-flex'>
										<!--产品图-->
										<div class='schemeSBoxPic xx-radius' />
										<!--描述-->
										<div class='orderSolutionDes xx-ml-3'>
											<div class='schemeBoxTitle'>
												吨方
											</div>
											<div class='schemeSBoxSubTitle'>
												折叠吨箱IBC
											</div>
										</div>
									</div>
									<!--数量-->
									<div class='perBoxDetailNum'>
										X 3件
									</div>
								</div>
							</div>
						</div>
						<!--提交按钮组-->
						<div class='orderSubmitModel'>
							<div class='allScheamPrice'>
								合计：<span class='redPrice xx-f-20'>￥12233</span> <span class='uselessPrice'>12333</span>
								<div class='allRoutes'>
									共<span class='routeNum'> 5 </span>条送箱路线
								</div>
							</div>
							<div class='baseButton orderButton xx-ml-2 xx-radius' @click='openOrdering'>
								立即下单
							</div>
						</div>
					</div>
				</transition>

				<!--方案订单结果页-->
				<transition name='xx'>
					<div v-show='is_show_confirm_order' class='baseDetailBoard orderResultPage'>
						<!--页面头-->
						<div class='baseBoardTop routeBackTop xx-f-16'>
							<div class='baseBoardTopContent'>
								<i class='el-icon-back backIcon' />订单确认
							</div>
						</div>
						<!--待支付-->
						<div class='unpaidModel xx-mt-2'>
							<p class='unpaidTipInfo'>
								<span class='unpaidInfoText xx-f-18'>待支付</span>
								<span class='unpaidInfoTime xx-f-12'>订单将在 <span class='deadLine'>23时33分44秒</span> 自动关闭</span>
							</p>
							<!--待支付单据-->
							<div class='baseOrderResultFrame unpaidBasicInfo'>
								<div class='perInfo'>
									<div class='title'>
										应付金额：
									</div>
									<div class='values price'>
										<span class='redPrice xx-f-20'>￥3333</span>（含税：6%）<span class='uselessPrice'>￥5555</span>
									</div>
								</div>
								<div class='perInfo'>
									<div class='title'>
										订单号：
									</div>
									<div class='values'>
										3231321321323132
									</div>
								</div>
								<div class='perInfo'>
									<div class='title'>
										下单时间：
									</div>
									<div class='values'>
										2021.07.26 14:45:23
									</div>
								</div>
							</div>
						</div>
						<!--付款方式-->
						<div class='baseModelName xx-f-18 xx-mt-2'>
							付款方式
						</div>
						<div class='orderContent orderPayWayContent xx-mt-1'>
							<div class='perPayInfo'>
								<div class='perPayKey'>
									支付方式：
								</div>
								<div class='perPayVal'>
									对公打款
								</div>
							</div>
							<div class='perPayInfo'>
								<div class='perPayKey'>
									收款人户名：
								</div>
								<div class='perPayVal'>
									上海箱箱智能科技有限公司
								</div>
							</div>
							<div class='perPayInfo'>
								<div class='perPayKey'>
									银行卡号：
								</div>
								<div class='perPayVal bankNum'>
									--
								</div>
							</div>
							<div class='perPayInfo payBankInfo'>
								<div class='perPayKey'>
									开户银行
								</div>
								<div class='perPayVal'>
									--
								</div>
							</div>
							<div class='payWayWarning'>
								<p class='warnTitle'>
									注意事项
								</p>
								<p class='perWarn'>
									1.下单后请尽快转账，转账金额需与订单金额一致，请勿多转、少转或分次转，否则影响对账进度；
								</p>
								<p class='perWarn'>
									2.汇款时将订单号填写至汇款单“用途/备注/摘要栏”
								</p>
							</div>
						</div>
						<!--订单信息-->
						<div class='baseModelName xx-f-18 xx-mt-2'>
							订单信息
						</div>
						<div class='addressTabsmodel addressTabsOrderedmodel'>
							<div class='tabsGroup'>
								<el-tabs v-model='editableTabsValue' type='card' closable @tab-remove='removeTab'>
									<el-tab-pane
										v-for='(item) in editableTabs'
										:key='item.name'
										:label='item.title'
										:name='item.name'
									/>
								</el-tabs>
							</div>
						</div>
						<div class='orderContent'>
							<!--送收货地址-->
							<section class='deliverAddr orderDeliverAddr xx-mt-2'>
								<p class='desStr xx-f-16'>
									送收箱路线
								</p>
								<div class='sendInfoBox'>
									<span class='signText send xx-radius'>发</span>
									<div class='senderInfo'>
										<div class='infoName xx-f-16'>
											网二 13555555555
										</div>
										<div class='infoAddress xx-mt-1'>
											湖南省张家界市永定区回龙路10号
										</div>
										<div class='outsideTips xx-f-12'>
											*该地址超出一口价区域，会增加超区运输费
										</div>
									</div>
								</div>
								<div class='receiveInfoBox'>
									<span class='signText receive xx-radius'>收</span>
									<div class='senderInfo'>
										<div class='infoName xx-f-16'>
											网二 13555555555
										</div>
										<div class='infoAddress xx-mt-1'>
											湖南省张家界市永定区回龙路10号
										</div>
										<div class='outsideTips xx-f-12'>
											*该地址超出一口价区域，会增加超区运输费
										</div>
									</div>
								</div>
							</section>
							<!--下单的商品信息-->
							<div class='schemeTitle xx-f-16 xx-mt-2'>
								商品信息
							</div>
							<div class='schemeBox xx-mt-2 xx-d-flex'>
								<div class='schemeBoxPic xx-radius' />
								<div class='orderSchemeBoxDes xx-ml-2'>
									<div class='schemeBoxTitle xx-f-16'>
										吨立方
									</div>
									<div class='orderSolutionInfo xx-mt-1'>
										<span class='orderSolutionPerPrice xx-f-16'>￥444</span> /套/趟（40天）
									</div>
								</div>
								<div class='orderGeneralNum xx-f-16'>
									X 3 件
								</div>
							</div>
							<!--方案组成-->
							<i class='triagle el-icon-caret-top' />
							<div class='schemeBoxDetail xx-radius'>
								<!--方案内产品列表-->
								<div class='perBoxDetailContainer'>
									<div class='perBoxDetail xx-d-flex'>
										<!--产品图-->
										<div class='schemeMBoxPic xx-radius' />
										<!--描述-->
										<div class='orderSolutionDes xx-ml-2'>
											<div class='schemeBoxTitle'>
												吨方
											</div>
											<div class='schemeSBoxSubTitle'>
												折叠吨箱IBC
											</div>
										</div>
									</div>
									<!--数量-->
									<div class='perBoxDetailNum'>
										X 3 件
									</div>
								</div>
								<div class='perBoxDetailContainer'>
									<div class='perBoxDetail xx-d-flex'>
										<!--产品图-->
										<div class='schemeSBoxPic xx-radius' />
										<!--描述-->
										<div class='orderSolutionDes xx-ml-3'>
											<div class='schemeBoxTitle'>
												吨方
											</div>
											<div class='schemeSBoxSubTitle'>
												折叠吨箱IBC
											</div>
										</div>
									</div>
									<!--数量-->
									<div class='perBoxDetailNum'>
										X 3件
									</div>
								</div>
								<div class='perBoxDetailContainer'>
									<div class='perBoxDetail xx-d-flex'>
										<!--产品图-->
										<div class='schemeSBoxPic xx-radius' />
										<!--描述-->
										<div class='orderSolutionDes xx-ml-3'>
											<div class='schemeBoxTitle'>
												吨方
											</div>
											<div class='schemeSBoxSubTitle'>
												折叠吨箱IBC
											</div>
										</div>
									</div>
									<!--数量-->
									<div class='perBoxDetailNum'>
										X 3件
									</div>
								</div>
							</div>
							<div class='orderTotalPrice'>
								<div class='perLinePrice'>
									<span class='perTypeTitle'>用箱费用：</span><span class='perTypePrice'>￥44333</span>
								</div>
								<div class='perLinePrice'>
									<span class='perTypeTitle'>超区运费：</span><span class='perTypePrice'>￥44333</span>
								</div>
								<div class='perLinePrice'>
									<span class='perTypeTitle'>小计：</span><span class='perTypePrice'>￥44333</span>
								</div>
							</div>
						</div>
						<div class='goToMyOrder xx-pointer xx-mt-3'>
							前往我的订单
						</div>
					</div>
				</transition>
			</div>
			<!--地图面板-->
			<Map @getAMap='getAMap' @getMapObj='getMapObj' />
		</div>
		<!--其它模块1-->
		<div class='otherModel'>
			<div class='otherModelTitle'>
				经典力作
			</div>
			<div class='otherModelDes'>
				从包装产品出发，我们勇敢迈入科技驱动的永续时代，成为可循环包装领域独树一帜的存在。在拥有创新高水准的同时，箱箱共用融汇行业顶级制造工艺与现代美学设计，臻于匠人精神，只为卓尔不凡淬炼。
			</div>
			<div class='otherModelContent'>
				<div class='imgBox imgBox1'>
					<div class='imgTitle'>
						吨立方&#174;1040
					</div>
					<div class='imgSTitle'>
						束缚，澎湃之力
					</div>
				</div>
				<div class='imgBox imgBox2'>
					<div class='imgTitle'>
						金刚 RPC 6419
					</div>
					<div class='imgSTitle'>
						是精湛工艺，是精密巧思
					</div>
				</div>
				<div class='imgBox imgBox3'>
					<div class='imgTitle'>
						金刚 RPC 6419
					</div>
					<div class='imgSTitle'>
						是精湛工艺，是精密巧思
					</div>
				</div>
			</div>
		</div>
		<!--其它模块2-->
		<div class='otherModel'>
			<div class='otherModelTitle'>
				无界探索
			</div>
			<div class='otherModelDes'>
				每个行业的包装都是关于载物的修为艺术，只有深入的探索才能让一个行业超越向前，具备灵魂。我们不局限、不被定义、不袖手旁观，更不设置有限边界，不断地寻找各个行业领域中，有什么是没被注意到的。箱箱共用渴望发现崭新领域，直至大有发现。现在，与你同分享。
			</div>
			<div class='otherModelSwitchContent'>
				<div class='videoTabs'>
					<div class='perTab' :class='{perTabActive: current_video_tab === 0}' @click='switchThisTab(0)'>
						散装液体解决方案
					</div>
					<div class='perTab' :class='{perTabActive: current_video_tab === 1}' @click='switchThisTab(1)'>
						生鲜果蔬解决方案
					</div>
					<div class='perTab' :class='{perTabActive: current_video_tab === 2}' @click='switchThisTab(2)'>
						汽配快运解决方案
					</div>
					<div class='perTab' :class='{perTabActive: current_video_tab === 3}' @click='switchThisTab(3)'>
						智能托盘解决方案
					</div>
				</div>
				<div v-show='current_video_tab===0' class='perVideoContent'>
					<div class='videoText'>
						在立方组合之间&nbsp;&nbsp;探索流动的极限
					</div>
					<video ref='dom_video_0' class='videoSize' autoplay loop src='@/static/video/water.mp4' />
				</div>
				<div v-show='current_video_tab===1' class='perVideoContent'>
					<div class='videoText'>
						清风徐来&nbsp;&nbsp;&nbsp;&nbsp;生而为鲜
					</div>
					<video ref='dom_video_1' class='videoSize' loop src='@/static/video/friuts.mp4' />
				</div>
				<div v-show='current_video_tab===2' class='perVideoContent perVideoContentWhite'>
					<div class='videoText'>
						在时空变幻中&nbsp;&nbsp;&nbsp;&nbsp;穿梭循环
					</div>
					<video ref='dom_video_2' class='videoSize' loop src='@/static/video/car.mp4' />
				</div>
				<div v-show='current_video_tab===3' class='perVideoContent perVideoContentWhite'>
					<div class='videoText'>
						气吞万象&nbsp;&nbsp;&nbsp;&nbsp;固若金汤
					</div>
					<video ref='dom_video_3' class='videoSize' loop src='@/static/video/tp.mp4' />
				</div>
			</div>
		</div>
		<!--其它模块3-->
		<div class='otherModel'>
			<div class='otherModelTitle'>
				绿动新境
			</div>
			<div class='otherModelDes'>
				这是一场关乎循环速度与技术的锱铢较量。箱箱共用行动的每一步，都离高效循环更进一步。我们反复丈量每一次周转的细节，不断探索循环的边界，也期待随时随地或跨越不同时空，与你共赴绿动新境。
			</div>
			<div class='otherModelContent'>
				<div class='imgBoxP3 imgBoxP3_1'>
					<div class='imgTitle'>
						全球巡展
					</div>
					<div class='imgSTitle'>
						从祖国到世界各地，我们的每一次巡展都期待有你箱伴
					</div>
				</div>
				<div class='imgBoxP3'>
					<video ref='dom_video_4' class='videoSize2' autoplay loop src='@/static/video/num.mp4' />
					<div class='positionAb'>
						<div class='imgTitle'>
							数智＋
						</div>
						<div class='imgSTitle'>
							高效循环不怕丢
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import { mapState } from 'vuex'
import Map from '@/components/index/Map.vue'

export default {
	name: 'IndexPage',
	components: { Map },
	props: [],
	async asyncData (context) {
		let route_query = context.route.query.product_type || ''
		// 获取产品列表
		let product_list = await context.app.$API_INDEX().post_product_list({ fullCode: route_query, page: 1, pageSize: 1000 })
		console.log('所有产品', product_list)
		// 获取配件列表
		let fitting_list = await context.app.$API_INDEX().post_fitting_list({ fullCode: route_query, page: 1, pageSize: 1000 })
		console.log('所有配件', fitting_list)
		// 获取方案列表
		let scheme_list = await context.app.$API_INDEX().get_scheme_list({ fullCode: route_query })
		console.log('所有方案', scheme_list)
		return { product_list, scheme_list, fitting_list }
	},
	data () {
		return {
			current_tab_type: 'allSolutionTab',
			options: [{
				value: '选项1',
				label: '黄金糕'
			}, {
				value: '选项2',
				label: '双皮奶'
			}, {
				value: '选项3',
				label: '蚵仔煎'
			}, {
				value: '选项4',
				label: '龙须面'
			}, {
				value: '选项5',
				label: '北京烤鸭'
			}],
			value: '',
			editableTabsValue: '2',
			editableTabs: [{
				title: 'Tab 1',
				name: '1',
				content: 'Tab 1 content'
			}, {
				title: 'Tab 2',
				name: '2',
				content: 'Tab 2 content'
			}],
			tabIndex: 2,
			num: '',
			input: '这里是地址',
			current_video_tab: 0,
			// AMap
			AMap: '',
			// map实例
			map_obj: '',
			// 是否显示产品列表/配件
			is_show_all_list: true,
			// 是否显示产品 || 方案详情
			is_show_pro_detail: false,
			// 是否显示方案详情
			is_show_solu_detail: false,
			// 是否显示下订单页面
			is_show_order: false,
			// 是否显示订单确认页
			is_show_confirm_order: false,
			// 方案详情数据
			solution_detail: '',
			// 产品详情数据
			product_detail: '',
			// 当前子方案
			current_solution: '',
			// 配件详情数据
			fitting_detail: '',
			// 配件/产品的详情类型（因为公用一个页面）
			detail_type: ''
		}
	},
	computed: {},
	watch: {
		// 监听路由参数变化
		'$route.query' () {
			console.log('路由变了')
			location.reload()
		}
	},
	beforeCreate () {
		console.log('index:beforeCreate')
	},
	created () {
		console.log('index:created')
	},
	beforeMount () {
		console.log('index:beforeMount')
	},
	mounted () {},
	methods: {
		getAMap (AMap) {
			this.AMap = AMap
		},
		getMapObj (map_obj) {
			this.map_obj = map_obj
		},
		/**
		 * @description 切换方案和所有产品（配件）的列表
		 */
		triggerTab (tab_type) {
			this.current_tab_type = tab_type
		},
		/**
		 * @description 获取配件详情
		 * @param { string } id 配件id
		 */
		getFittingDetail (id) {
			console.log('配件id:', id)
		},
		/**
		 * @description 获取方案详情
		 * @param { string } id 方案id
		 */
		getSchemeDetail (id) {
			console.log('方案id:', id)
		},
		/**
		 * @description 下订单增加新地址
		 */
		addTab (targetName) {
			console.log('新增地址tab：', targetName)
			const newTabName = ++this.tabIndex + ''
			this.editableTabs.push({
				title: 'New Tab',
				name: newTabName,
				content: 'New Tab content'
			})
			this.editableTabsValue = newTabName
		},
		/**
		 * @description 移除某地址
		 */
		removeTab (targetName) {
			const tabs = this.editableTabs
			let activeName = this.editableTabsValue
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						const nextTab = tabs[index + 1] || tabs[index - 1]
						if (nextTab) {
							activeName = nextTab.name
						}
					}
				})
			}

			this.editableTabsValue = activeName
			this.editableTabs = tabs.filter(tab => tab.name !== targetName)
		},
		/**
		 * @description 修改下单数
		 */
		changeOrderNum (value) {
			console.log(value)
		},
		/**
		 * @description 切换多个地址
		 */
		switchThisTab (tab_index) {
			this.current_video_tab = tab_index
			this.$refs[`dom_video_${tab_index}`].play()
		},
		/**
		 * @description 显示产品详情
		 * @param { string } product_id 产品id || 配件id
		 * @param { type } type 产品 product/配件 fitting
		 */
		openProductDetail (id, type) {
			// 关闭方案详情
			this.is_show_solu_detail = false
			// 打开产品/配件详情
			this.is_show_pro_detail = true
			this.detail_type = type
			if (type === 'product') {
				this.$API_INDEX().get_product_detail({ id }).then(data => {
					if (data) {
						this.product_detail = data
					}
				})
			}
			if (type === 'fitting') {
				this.$API_INDEX().get_fitting_detail({ id }).then(data => {
					if (data) {
						this.fitting_detail = data
					}
				})
			}
		},
		/**
		 * @description 关闭产品详情面板
		 */
		closeProductDetail () {
			this.is_show_pro_detail = false
		},
		/**
		 * @description 打开方案详情
		 * @param { string } id 解决方案id
		 */
		openSolutionDetail (id) {
			console.log('解决方案id', id)
			this.is_show_solu_detail = true
			this.is_show_pro_detail = false
			this.$API_INDEX().get_scheme_list({ id }).then(data => {
				if (data) {
					this.solution_detail = data
				}
			})
		},
		/**
		 * @description 关闭方案详情
		 */
		closeSolutionDetail () {
			this.is_show_solu_detail = false
		},
		openOrdering () {
			// 关闭产品/配件/方案列表
			this.is_show_all_list = false
			// 关闭产品/配件/方案
			this.is_show_solu_detail = false
			this.is_show_pro_detail = false
			// 关闭确认订单页
			this.is_show_confirm_order = false
			// 显示下单页面
			this.is_show_order = true
		},
		/**
		 * @description 打开留咨窗口
		 */
		openLeaveMessage () {
			this.$store.commit('showLeaveMessageDialog')
		},
		/**
		 * @description 打开登陆
		 */
		triggerLogin () {
			this.$store.commit('showLoginDialog')
		}
	}
}
</script>

<style lang='scss' scoped>
.indexPage {
	.productModel{
		display: flex;
	}
	.productListBoard{
		width:440px;
		height:800px;
		background: #F0F1F2;
		position: relative;
		.baseBoardTop{
			width:100%;
			height:56px;
			background-color: #ffffff;
		}
		.boardTypeTab{
			padding:0 16px;
		}
		.baseBoardTopContent{
			width:408px;
			margin-right:auto;
			margin-left:auto;
		}
		.perTab{
			display: inline-block;
			text-align: center;
			margin-right:40px;
			width:64px;
			height:56px;
			line-height: 56px;
			transition:all 0.3s;
			border-bottom: 4px solid rgba(103,169,42,0);
		}
		.activedTab{
			color:#67A92A;
			border-bottom: 4px solid rgba(103,169,42,1);
		}
		.normalList{
			height:740px;
			padding:16px 16px;
			overflow: auto;
		}
		/*----- 解决方案 -----*/
		.perSolution{
			width:100%;
			height:349px;
			background-color: #ffffff;
			margin-bottom:16px;
		}
		.solutionPic{
			height:238px;
		}
		.sketch,.fittingSketch{
			padding:16px;
		}
		.fittingSketch{
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.baseDetailDes{
			width:100%;
			line-height: 28px;
		}
		.baseDetailWholeDes{
			margin-top:8px;
			width:100%;
		}
		.schemeTitle{
			color:#2c2c2c;
		}
		.baseName{
			font-size:16px;
			font-weight: bold;
			color:#2C2C2C;
		}
		.solutionName{
			width:100%;
		}
		.solutionWholeName{
			width:100%;
		}
		.loginVisibleButton{
			width:80px;
			height:28px;
			margin-top:10px;
			text-align: center;
			line-height: 28px;
			color:#67A92A;
			border:1px solid #67A92A;
			border-radius: 14px;
		}
		.fittingLoginVisibleButton{
			margin-top:16px;
		}
		.productLoginVisibleButton{
			margin-top:18px;
		}
		.visiblePrice{
			display:flex;
			width:100%;
			margin-top:12px;
			color:#aaaaaa;
			align-items: center;
		}
		.soVisiblePrice{
			margin-top:8px;
		}
		.priceLeft{
			display:flex;
			align-items: center;
		}
		.productPrice {
			color:#2c2c2c;
			font-weight:bold;
			padding-right:4px;
		}
		.listBoard{
			width:440px;
			height:800px;
			position: absolute;
			z-index: 3;
			left:0;
			top:0;
			background-color: #F0F1F2;
			box-shadow: 20px 0px 25px 0px rgba(0, 0, 0, 0.07);
		}
		.baseDetailBoard{
			width:440px;
			height:800px;
			position: absolute;
			z-index: 1;
			left:440px;
			top:0;
			background-color: #ffffff;
		}
		.solutionDetailBoard, .productDetailBoard{
			z-index: 2;
			overflow: auto;
		}
		.banner{
			width:440px;
			height:224px;
		}
		.closeDetailBoard{
			width:26px;
			height:26px;
			position: absolute;
			z-index: 3;
			right:16px;
			top:16px;
			fill:#ffffff;
			cursor:pointer;
		}
		.solutionDetails{
			height:508px;
			padding:16px;
			overflow-y: auto;
		}
		.productDetails{
			height:508px;
			padding:16px;
			overflow-y: auto;
		}
		.detailBoardPrice{
			display: flex;
			color:#aaaaaa;
			justify-content: space-between;
			align-items: center;
		}
		.schemeBox, .orderBox{
			align-items: center;
		}
		.schemeBoxPic, .orderBoxPicContainer{
			display: block;
			width:88px;
			height:88px;
			background-color: #D8D8D8;
		}
		.orderBoxPicContainer{
			width:155px;
			height:88px;
			margin-right:16px;
		}
		.schemeBoxTitle{
			color:#2C2C2C;
			font-weight: bold;
		}
		.schemeBoxSubTitle{
			color:#999999;
		}
		.triagle{
			display: block;
			margin-left:30px;
			color:#f4f4f4;
			font-size:28px;
			line-height:10px;
			margin-top:8px;
		}
		.schemeBoxDetail{
			padding:16px;
			background-color: #f4f4f4;
		}
		.schemeBoxList{
			flex-wrap: wrap;
			height:250px;
			overflow-y: auto;
		}
		.perBoxDetail{
			width:60%;
			align-items: center;
			flex-shrink: 0;
		}
		.schemeSBoxPic, .schemeMBoxPic{
			width:64px;
			height:64px;
			background-color: #DCDDDD;
		}
		.schemeSBoxSubTitle{
			margin-top:4px;
		}
		.orderButtons{
			height:68px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding:0 16px;
			border-top:1px solid #EEEEEE
		}
		.baseButton{
			width: 144px;
			height: 48px;
			line-height: 48px;
			text-align: center;
			cursor:pointer;
			position: relative;
		}
		.freeTrialButton{
			color:#67A92A;
			background: #FFFFFF;
			border: 1px solid #67A92A;
		}
		.orderButton{
			background: #67A92A;
			color:#ffffff;
		}
		.top100Tips{
			width: 64px;
			height: 20px;
			line-height: 20px;
			background: #FF8003;
			border-radius: 0px 10px 0px 10px;
			color:#ffffff;
			position: absolute;
			right:-1px;
			top:-10px;
			z-index: 1;
		}
		/*----- 产品列表 -----*/
		.productGroup{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.groupName{
			color:#2c2c2c;
			margin-bottom:24px;
			margin-bottom:16px;
		}
		.perProduct, .perFitting{
			width:180px;
			height:283px;
			margin-bottom:16px;
			background-color: #ffffff;
			transition:all 0.3s;
			box-shadow:  4px 4px 8px -1px rgba(0, 0, 0, 0);
		}
		.perFitting{
			width:100%;
			height:136px;
			display: flex;
		}
		.perProduct:hover, .perFitting:hover{
			box-shadow:  4px 4px 8px -1px rgba(0, 0, 0, 0.1);
		}
		.productImg, .fittingImg{
			display: block;
			width:180px;
			height:180px;
			border-radius: 4px 0 0 4px;
		}
		.fittingImg{
			width:125px;
			height:136px;
		}
		.productName{
			margin-bottom:4px;
			width:100%;
		}
		.sTypeName{
			color:#999999;
			font-weight: normal;
		}
		.baseProDetailDes{
			margin-bottom:20px;
		}
		.proDetailDes{
			width:100%;
		}
		.paramsTitle{
			color:#2c2c2c;
			font-size:16px;
			margin-bottom:16px;
		}
		.paramDetailImg{
			display: block;
			width:100%;
		}
		.el-icon-warning{
			color:#aaaaaa;
		}
		// .perParam{
		// 	display: flex;
		// 	line-height: 40px;
		// 	justify-content: space-between;
		// }
		// .proKeyName{
		// 	color:#2C2C2C;
		// 	font-weight:bold;
		// }
		/*----- 方案下单/确认订单页 -----*/
		.confirmOrderPage{
			background-color: #F0F1F2;
			left:0px;
		}
		.routeBackTop{
			display: flex;
			align-items: center;
			color:#2c2c2c;
		}
		.backIcon{
			padding-right:4px;
		}
		.addressTabsmodel{
			width:408px;
			height:40px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left:auto;
			margin-right:auto;
			margin-top:16px;
		}
		.tabsGroup{
			width:382px;
		}
		.addNewAddress{
			color:#67A92A;
			font-size:22px;
		}
		.orderContent, .orderingContent{
			background-color: #ffffff;
			width:408px;
			margin-left:auto;
			margin-right:auto;
			border-radius: 0px 4px 4px 4px;
			padding:16px 16px;
		}
		.orderingContent{
			height:616px;
			overflow-y: auto;
		}
		.inputAddrContainer{
			width: 376px;
			display: flex;
		}
		.addrInputs{
			width:340px;
			position: relative;
			margin-left:16px;
		}
		.addrInput{
			width:340px;
			padding-left:0;
			padding-right:40px;
			border-left:0;
			border-right:0;
			border-top:0;
			border-bottom:1px solid #eeeeee;
			margin-bottom:12px;
		}
		.addrContactsInput{
			width:127px;
			border-bottom:1px solid #eeeeee;
			margin-right:16px;
		}
		.addrPhoneInput{
			width:192px;
			border-bottom:1px solid #eeeeee;
		}
		.outlineTips{
			margin-top:16px;
			color:#F74141;
		}
		.orderDeliverAddr{
			border-bottom:1px solid #EDEDED;
			padding-bottom:16px;
		}
		.addressButton{
			height:22px;
			line-height:22px;
			border-left:1px solid #eeeeee;
			padding-left:8px;
			position: absolute;
			z-index: 1;
			right:16px;
			top:8px;
		}
		.locationIcon{
			width:12px;
			height:12px;
		}
		.signText{
			width: 20px;
			height: 20px;
			text-align: center;
			line-height: 20px;
			color:#ffffff;
			margin-top:8px;
		}
		.send{
			background: #0E7AFF;
		}
		.receive{
			color:#4A3000;
			background: #FFA703;
		}
		.sendInfoBox, .receiveInfoBox{
			display: flex;
			align-items: center;
			margin-top:16px;
		}
		.senderInfo{
			margin-left:24px;
		}
		.outsideTips{
			color:#F74141;
			line-height: 24px;
		}
		.inputModel{
			width:254px;
			margin-left:16px;
		}
		.orderSolutionPerPrice{
			color:#2c2c2c;
			font-weight: bold;
		}
		.orderSolutionInfo{
			color:#aaaaaa;
		}
		.counterBar{
			margin-top:16px;
			align-items: center;
		}
		.countNum{
			width:84px;
			display: block;
			border:1px solid #dddddd;
			text-align: left;
			color:#666666;
			margin-right:8px;
		}
		.orderSchemeBoxDes{
			width:210px;
		}
		.orderSchemeBoxList{
			overflow-y: auto;
		}
		.perBoxDetailContainer{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom:16px;
		}
		.perBoxDetailContainer:first-child{
			padding-bottom:16px;
			border-bottom:1px solid #E4E4E4;
		}
		.perBoxDetailContainer:last-child{
			margin-bottom:0px;
		}
		.schemeMBoxPic{
			width:72px;
			height:72px;
		}
		.orderSubmitModel{
			width:100%;
			height:64px;
			padding:8px 16px;
			margin-top:8px;
			background-color:#ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.redPrice{
			color:#F74141;
		}
		.uselessPrice{
			color:#999999;
			text-decoration: line-through;
		}
		.allRoutes{
			color:#aaaaaa;
		}
		.routeNum{
			color:#2C2C2C;
		}
		/*----- 方案订单结果页 -----*/
		.baseOrderResultFrame{
			width:408px;
			margin-left:auto;
			margin-right:auto;
			background-color: #ffffff;
			border-radius: 4px;
		}
		.orderResultPage{
			background-color: #F0F1F2;
			left:0px;
			overflow: auto;
		}
		.unpaidModel {
			width:408px;
			margin-left:auto;
			margin-right:auto;
		}
		.unpaidTipInfo{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.unpaidInfoText{
			color:#FF8003;
		}
		.unpaidInfoTime{
			color:#AAAAAA;
		}
		.deadLine{
			color:#2C2C2C;
		}
		.unpaidBasicInfo{
			height:110px;
			margin-top:20px;
			padding:16px 16px;
		}
		.perInfo{
			display: flex;
			align-items: center;
			margin-bottom:6px;
		}
		.title{
			width:70px;
			margin-right:16px;
		}
		.perInfo:first-child{
			margin-bottom:10px
		}
		.title{
			color:#999999;
		}
		.contractTitle{
			color:#aaaaaa;
		}
		.orderGeneralNum{
			color:#2c2c2c;
		}
		.orderTotalPrice{
			margin-top:16px;
			text-align: right;
			color:#999999;
		}
		.perLinePrice{
			line-height: 24px;
		}
		.perTypePrice{
			color:#2c2c2c;
			font-weight: bold;
		}
		.baseModelName{
			color:#2c2c2c;
			padding:0px 16px;
		}
		.addressTabsOrderedmodel{
			margin-top:8px;
		}
		.orderPayContent{
			border-radius: 4px;
		}
		.orderPayWayContent{
			border-radius: 4px;
			padding:8px 16px;
			margin-bottom:24px;
		}
		.perPayInfo{
			line-height: 28px;
			display: flex;
		}
		.payBankInfo{
			margin-bottom:16px;
		}
		.perPayInfo:last-child{
			margin-bottom: 16px;
		}
		.perPayKey{
			color:#999999;
			width:90px;
		}
		.bankNum{
			font-weight: bold;
			color:#2c2c2c;
		}
		.payWayWarning{
			border-top:1px solid #EDEDED;
			padding: 16px 0;
		}
		.warnTitle{
			color:#2c2c2c;
			font-weight:bold;
			margin-bottom:8px;
		}
		.perWarn{
			line-height: 24px;
		}
		.goToMyOrder {
			margin-bottom:24px;
		}
	}
	/*----- 其它模块1 -----*/
	.otherModel{
		overflow: hidden;
		background-color: #ffffff;
	}
	.otherModel:last-child{
		height:1000px;
	}
	.otherModelTitle{
		text-align: center;
		font-weight:bold;
		font-size:32px;
		margin-top:64px;
		color:#3E4046;
	}
	.otherModelDes{
		color:#61646A;
		text-align: center;
		width:512px;
		margin-left:auto;
		margin-right:auto;
		line-height: 28px;
		margin-top:30px;
	}
	.otherModelContent{
		width:1440px;
		margin-left:auto;
		margin-right:auto;
		display: flex;
		justify-content: space-evenly;
		margin-top:150px;
		.imgBox{
			width:458px;
			height:640px;
			background-size:458px 640px;
			overflow: hidden;
			text-align: center;
		}
		.imgBox1{
			background-image: url('@/assets/imgs/ton.png')
		}
		.imgBox2{
			background-image: url('@/assets/imgs/king.png');
		}
		.imgBox3{
			background-image: url('@/assets/imgs/box.png') ;
		}
		.imgTitle{
			font-size:32px;
			color:#3E4046;
			margin-top:55px;
		}
		.imgSTitle{
			font-size:15px;
			color:#61646A;
			margin-top:9px;
		}
		.imgBoxP3{
			width:702px;
			height:450px;
			overflow: hidden;
			position: relative;
			background-size:702px 450px;
			text-align: center;
			.imgTitle, .imgSTitle{
				color:#ffffff;
			}
		}
		.imgBoxP3_1{
			background-image: url('@/assets/imgs/index_p1.png')
		}
		.positionAb{
			position: absolute;
			z-index: 1;
		}
		.videoSize2{
			width:702px;
		}
	}
	.otherModelSwitchContent{
		width:1440px;
		margin-left:auto;
		margin-right:auto;
		margin-top:150px;
		.videoTabs{
			width:652px;
			display: flex;
			margin-left:auto;
			margin-right:auto;
			justify-content: space-between;
		}
		.perTab{
			transition:all 0.3s;
			border-bottom:2px solid #ffffff;
			color:#A1A2A9;
			cursor: pointer;
			height:38px;
		}
		.perTabActive{
			border-bottom:2px solid #121317;
			color:#3E4046;
		}
		.perVideoContent{
			position: relative;
			color:#3E4046;
		}
		.perVideoContentWhite{
			color:#ffffff;
		}
		.videoText{
			position: absolute;
			z-index: 1;
			width:600px;
			height:56px;
			text-align: center;
			top:113px;
			font-size:40px;
			left:0;
			right:0;
			margin:auto;
		}
		.videoSize{
			width:1440px;
			height:480px;
		}
	}
    // .iconwujiaoxing{
    //     font-size:12px;
    //     color:red;
    // }
	.countNumTips{
		color:#aaaaaa;
		margin: top 2px;
		margin: left 2px;
	}
	.trInfo{
		border-bottom:1px solid #EDEDED;
		height:48px;
		line-height:48px;
		display: flex;
	}
	.tdInfo{
		text-align: center;
		width:102px;
	}
	.tdInfo:first-child{
		border-right:1px solid #EDEDED;
	}
	.tdInfo:last-child{
		width:298px;
		text-align: left;
		padding-left:24px;
	}
	.trInfo:first-child{
		background-color: #F2F3F5;
		font-weight: bold;
		color:#2c2c2c;
	}
	.trInfo:last-child{
		border-bottom:0;
	}
	.warnTitle{
		font-weight: bold;
	}
	.itemText{
		line-height: 28px;
	}
	.goToMyOrder{
		text-align: center;
		line-height: 28px;
		color:#0E7AFF;
	}
}
</style>
<style lang="scss">
.indexPage{
	.sTypeSelect{
		border:1px solid #E8E8E8;
		width:128px;
		.el-input__inner{
			background-color: #f4f4f4;
			font-size:14px;
			color:#666666;
			border-color:#dddddd;
		}
	}
	// elementUI - tabs
	.el-tabs__header{
		margin-bottom:0;
		border-bottom:0;
	}
	.el-tabs--card > .el-tabs__header .el-tabs__nav{
		background-color: #e7e7e7;
		border:0;
	}
	.el-tabs__item{
		color:#666666;
		border:0;
		border-radius: 4px 4px 0 0;
	}
	.el-tabs__item:hover{
		color:#666666
	}
	.el-tabs__nav{
		.is-active{
			background-color: #ffffff;
			border-bottom:0;
		}
	}
	.el-input__inner{
		border:0;
		&:hover,&:focus{
			border:0;
		}
	}
	.countNum{
		.el-input__inner{
			padding:0 4px 0 4px;
			text-align: left;
		}
	}
}
</style>
