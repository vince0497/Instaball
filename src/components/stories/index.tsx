import image1 from "@/assets/images/Black Pegasus.png"
import image2 from "@/assets/images/gr.jpg"
import image3 from "@/assets/images/mange.jpg"
interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = (props) => {
    return (
        <div className="flex justify-between">
            <img src={image1} alt="" className="w-20 h-20 rounded-full border-4 border-slate-800
            object-slab " />
            <img src={image2} alt="" className="w-20 h-20 rounded-full border-4 border-slate-800
            object-slab " />
            <img src={image3} alt="" className="w-20 h-20 rounded-full border-4 border-slate-800
            object-slab " />
            <img src={image2} alt="" className="w-20 h-20 rounded-full border-4 border-slate-800
            object-slab " />
            <img src={image1} alt="" className="w-20 h-20 rounded-full border-4 border-slate-800
            object-slab " />

        </div>
    );
}

export default Stories;