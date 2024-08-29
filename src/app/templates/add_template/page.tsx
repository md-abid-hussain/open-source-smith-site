import AddTemplatePageForm from "@/components/template-components/add-template-component";

export default function AddTemplatePage() {

    return (
        <div className="hero-height sm:hero-height-sm flex flex-col justify-center py-10">
            <h1 className="text-3xl text-center font-bold">Add Template</h1>
            <AddTemplatePageForm />
        </div>
    );
}