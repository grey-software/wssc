import solidWaste from '../assets/solid-waste.jpg'
import waterSupply from '../assets/water-supply2.jpg'
import WasteWater from '../assets/wastewater.webp'
import stuff from '../assets/employeeComplaint.webp'
import other from '../assets/other.webp'



export const complaints_types = [
    {
        img: waterSupply,
        name: "Water Supply",
        urdu: "پانی کی فراہمی",
        complaintType: "Water-Supply"
    },
    {
        img: WasteWater,
        name: "Waste Water",
        urdu: "گندا پانی",
        complaintType: "Waste-water"


    },
    {
        img: solidWaste,
        name: "Solid Waste",
        urdu: "سالڈ ویسٹ",
        complaintType: "Solid-waste"


    },
    {
        img: stuff,
        name: "Staff",
        urdu: "ملازم کی شکایت",
        complaintType: "Staff"


    },
    {
        img: other,
        name: "Other",
        urdu: "دوسری شکایت",
        complaintType: "Other"


    },
]
