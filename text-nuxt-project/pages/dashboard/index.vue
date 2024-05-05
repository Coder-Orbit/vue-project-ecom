<script setup lang="ts">
import Chart from 'primevue/chart';
import Card from 'primevue/card';

import Paginator from 'primevue/paginator';


import { ref, onMounted } from "vue";

    definePageMeta({
        layout: "dashboard",
    })

    onMounted(() => {
		setTimeout(function () {
			chartData.value = setChartData();
			lineData.value = setLineData();
            pieData.value = setPieData();
            barData.value = setBarData();
            // options
            pieOptions.value = setChartOptions();
		}, 500);
		
	});

	const chartData = ref();
	const lineData = ref();
	const pieData = ref();
	const barData = ref();
	const pieOptions = ref();

    const setChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: ['01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            datasets: [
                {
                    label: "This Month",
                
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: 0.4
                },
                {
                    label: "Previous Month",
                    
                    data: [28, 48, 400, 19, 86, 27, 90],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    tension: 0.4
                }
            ]
        };
    };


    const setLineData = () => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: ['01', '02', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            datasets: [
                {
                    label: "This Month",
                
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: 0.4
                },
                {
                    label: "Previous Month",
                    
                    data: [28, 48, 400, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--gray-500'),
                    backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                    tension: 0.4
                }
            ]
        };
    };


    const setBarData = () => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [
                {
                    label: "This Week",
                
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: "Previous Week",
                    
                    data: [28, 48, 400, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--gray-300'),
                    backgroundColor: documentStyle.getPropertyValue('--gray-300'),
                    tension: 0.4
                }
            ]
        };
    };


    const setPieData = () => {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: ['Pending', 'Process', 'Packaging', 'Cancel', 'Rejected', 'Delivered'],
            datasets: [
                {
                
                    data: [65, 59, 80, 81, 56, 55],
                    fill: true,
                    // borderColor: [documentStyle.getPropertyValue('--green-700'), documentStyle.getPropertyValue('--blue-700'), documentStyle.getPropertyValue('--yellow-700'), documentStyle.getPropertyValue('--pink-700'), documentStyle.getPropertyValue('--red-700'), documentStyle.getPropertyValue('--green-500')],
                    backgroundColor: [documentStyle.getPropertyValue('--orange-600'), documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--yellow-600'), documentStyle.getPropertyValue('--pink-600'), documentStyle.getPropertyValue('--red-600'),documentStyle.getPropertyValue('--green-600')],
                    tension: 0.4
                }
            ]
        };
    };

    const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        plugins: {
            legend: {
                display: false,
                position: "left"
            }
            
        }
    };
};




</script>

<template>
    <NuxtLayout :name="layout">
        <div class="w-full px-3 mt-1">

            <div class="grid grid-cols-4 gap-3 w-full">
                <div class="shadow-md bg-white w-full p-2 rounded-md">
                    <Chart unstyled type="line" :data="chartData" class="h-30rem" />
                </div>
                <div class="shadow-md bg-white w-full p-2 rounded-md">1</div>
                <div class="shadow-md bg-white w-full p-2 rounded-md">1</div>
                <div class="shadow-md bg-white w-full p-2 rounded-md">4</div>
                
            </div>
            <!-- Dashbaord graph -->

            <div class="w-full">
                <div class="w-full flex">
                    <div class="w-2/3">
                        <div class="shadow-md bg-white w-full p-2 rounded-md mt-3">
                            <Chart type="line" :data="lineData"  :height="70" />
                        </div>
                    </div>
                    <div class="w-1/3 ml-3 mt-3">
                        <div class="w-full justify-between flex rounded-md p-3 shadow-md bg-white">
                        
                            <Chart type="doughnut" :data="pieData" :options="pieOptions" :width="158" :height="10" />
                            <div class="justify-end text-end" >
                                <div class="flex"> 
                                    <div class="bg-green-500 border-green-600 border-2 w-14 h-5"></div>
                                    <div class="ml-1">Delivered</div> 
                                </div>
                                <div class="flex"> 
                                    <div class="bg-orange-500 border-orange-600 border-2 w-14 h-5"></div>
                                    <div class="ml-1">Pending</div> 
                                </div>
                                <div class="flex"> 
                                    <div class="bg-blue-500 border-blue-600 border-2 w-14 h-5"></div>
                                    <div class="ml-1">Process</div> 
                                </div>
                                <div class="flex"> 
                                    <div class="bg-yellow-500 border-yellow-600 border-2 w-14 h-5"></div>
                                    <div class="ml-1">Packaging</div> 
                                </div>
                                <div class="flex"> 
                                    <div class="bg-pink-500 border-pink-600 border-2 w-14 h-5"></div>
                                    <div class="ml-1">Cancel</div> 
                                </div>
                                <div class="flex"> 
                                    <div class="bg-red-500 border-red-600 border-2 w-14 h-5"></div>
                                    <div class="ml-1">Rejected</div> 
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="w-2/3 flex">
                        <div class="shadow-md bg-white w-full p-2 rounded-md mt-3">
                            <div class="flex w-full justify-between">
                                <div class="order_title">
                                    <H1 class="text-md font-semibold">Recent Order List</H1>
                                </div>
                                <div class="order_title text-sm">
                                    <div class="pagination">
                                        <a class="p-1  mt-1 text-black " href="#">&laquo;</a>
                                        <a class="p-1 px-2 mt-1 border-t-4 border-red-500 text-red-500" href="#">1</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">2</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">3</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">4</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">5</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">...</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">6</a>
                                        <a class="p-2 mt-1 text-black m-1" href="#">&raquo;</a>
                                    </div>
                                </div>
                                

                            </div>
                                <table class="table-auto w-full mt-2" ref="pdfSection">
                                    <thead >
                                        <tr class="w-full bg-gray-300 text-xs">
                                            <th class="p-1 text-left text-xs">SL</th>
                                            <th class="p-1 text-left text-xs">Name</th>
                                            <th class="p-1 text-left text-xs">Invoice#</th>
                                            <th class="p-1 text-left text-xs">Qty</th>
                                            <th class="p-1 text-left text-xs">Total</th>
                                            <th class="p-1 text-left">Status</th>
                                            <th class="p-1 text-left">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white odd:bg-gray-100">
                                            <td class="p-1 text-left text-xs">1</td>
                                            <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                                            <td class="p-1 text-left text-xs">#123456778</td>
                                            <td class="p-1 text-left text-xs">3</td>
                                            <td class="p-1 text-left text-xs">1234</td>
                                            <td class="p-1 text-left text-xs">Pending</td>
                                            <td class="p-1 text-left text-xs">30-nov-2023 10:30</td>
                                            
                                        </tr>
                                        <tr class="bg-white odd:bg-gray-100">
                                            <td class="p-1 text-left text-xs">2</td>
                                            <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                                            <td class="p-1 text-left text-xs">#123456778</td>
                                            <td class="p-1 text-left text-xs">3</td>
                                            <td class="p-1 text-left text-xs">1234</td>
                                            <td class="p-1 text-left text-xs">Pending</td>
                                            <td class="p-1 text-left text-xs">30-nov-2023 10:30</td>
                                            
                                        </tr>
                                        <tr class="bg-white odd:bg-gray-100">
                                            <td class="p-1 text-left text-xs">3</td>
                                            <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                                            <td class="p-1 text-left text-xs">#123456778</td>
                                            <td class="p-1 text-left text-xs">3</td>
                                            <td class="p-1 text-left text-xs">1234</td>
                                            <td class="p-1 text-left text-xs">Pending</td>
                                            <td class="p-1 text-left text-xs">30-nov-2023 10:30</td>
                                            
                                        </tr>
                                        <tr class="bg-white odd:bg-gray-100">
                                            <td class="p-1 text-left text-xs">4</td>
                                            <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                                            <td class="p-1 text-left text-xs">#123456778</td>
                                            <td class="p-1 text-left text-xs">3</td>
                                            <td class="p-1 text-left text-xs">1234</td>
                                            <td class="p-1 text-left text-xs">Pending</td>
                                            <td class="p-1 text-left text-xs">30-nov-2023 10:30</td>
                                            
                                        </tr>
                                        <tr class="bg-white odd:bg-gray-100">
                                            <td class="p-1 text-left text-xs">5</td>
                                            <td class="p-1 text-left text-xs">Md Majadul Islam</td>
                                            <td class="p-1 text-left text-xs">#123456778</td>
                                            <td class="p-1 text-left text-xs">3</td>
                                            <td class="p-1 text-left text-xs">1234</td>
                                            <td class="p-1 text-left text-xs">Pending</td>
                                            <td class="p-1 text-left text-xs">30-nov-2023 10:30</td>
                                            
                                        </tr>
                                        
                                    </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="w-1/3 ml-3">
                        <div class="shadow-md bg-white w-full p-2 rounded-md mt-3">
                            <Chart type="bar" :data="barData"  class="h-30rem"  />
                        </div>

                    </div>
                </div>
                
            </div>
            
        </div>
    </NuxtLayout>
</template>

<style>

    
</style>