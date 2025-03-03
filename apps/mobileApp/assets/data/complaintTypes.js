import solidWaste from '../../assets/solid-waste.jpg'
import waterSupply from '../../assets/water-supply2.jpg'
import WasteWater from '../../assets/wastewater.webp'
import staff from '../../assets/employeeComplaint.webp'
import other from '../../assets/other.webp'



export const complaints_types = [
    {
        id: 1,
        img: waterSupply,
        name: "Water Supply",
        urdu: "پانی کی فراہمی",
        complaintType: "Water Supply"
    },
    {
        id: 2,
        img: WasteWater,
        name: "Waste Water",
        urdu: "گندا پانی",
        complaintType: "Waste water"


    },
    {
        id: 3,
        img: solidWaste,
        name: "Solid Waste",
        urdu: "سالڈ ویسٹ",
        complaintType: "Solid waste"


    },
    {
        id: 4,
        img: staff,
        name: "Staff",
        urdu: "ملازم کی شکایت",
        complaintType: "Staff"


    },
    {
        id: 5,
        img: other,
        name: "Other",
        urdu: "دوسری شکایت",
        complaintType: "Other"


    },
]