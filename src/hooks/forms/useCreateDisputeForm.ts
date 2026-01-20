import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateDispute } from "@/hooks/actions/useCreateDispute";
import { uploadFileToIPFS } from "@/util/ipfs";
import type { CreateDisputeForm, FileState } from "@/components/create";

export const useCreateDisputeForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { createDispute, isCreating } = useCreateDispute();

    const [isUploading, setIsUploading] = useState(false);

    // --- FORM STATE ---
    const [formData, setFormData] = useState<CreateDisputeForm>({
        title: "",
        category: "General",
        jurorsRequired: 3,
        deadlineHours: 96,
        claimerName: "",
        claimerAddress: "",
        defenderName: "",
        defenderAddress: "",
        description: "",
        evidenceLink: "",
        defDescription: "",
    });

    // --- FILE STATE ---
    const [files, setFiles] = useState<FileState>({
        audio: null,
        carousel: [],
        defAudio: null,
        defCarousel: [],
    });

    // --- HANDLERS ---
    const updateField = (
        field: keyof CreateDisputeForm,
        value: string | number,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const submit = async () => {
        if (formData.jurorsRequired % 2 === 0) {
            toast.error("Please select an odd number of jurors.");
            return;
        }

        try {
            setIsUploading(true);

            // 1. Upload Claimant Assets
            let audioUrl = "";
            if (files.audio) {
                toast.info("Uploading claimant audio...");
                const hash = await uploadFileToIPFS(files.audio);
                if (hash) audioUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
            }

            let carouselUrls: string[] = [];
            if (files.carousel.length > 0) {
                toast.info("Uploading claimant photos...");
                const uploadPromises = files.carousel.map((f) => uploadFileToIPFS(f));
                const hashes = await Promise.all(uploadPromises);
                carouselUrls = hashes
                    .filter((h) => h)
                    .map((h) => `https://gateway.pinata.cloud/ipfs/${h}`);
            }

            // 2. Upload Defender Assets
            let defAudioUrl: string | null = null;
            if (files.defAudio) {
                const hash = await uploadFileToIPFS(files.defAudio);
                if (hash) defAudioUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
            }

            let defCarouselUrls: string[] = [];
            if (files.defCarousel.length > 0) {
                const hashes = await Promise.all(
                    files.defCarousel.map((f) => uploadFileToIPFS(f)),
                );
                defCarouselUrls = hashes
                    .filter((h) => h)
                    .map((h) => `https://gateway.pinata.cloud/ipfs/${h}`);
            }

            // 3. Construct Payload
            const disputePayload = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                evidence: formData.evidenceLink ? [formData.evidenceLink] : [],
                aliases: {
                    claimer: formData.claimerName || "Anonymous Claimant",
                    defender: formData.defenderName || "Anonymous Defendant",
                },
                audioEvidence: audioUrl || null,
                carouselEvidence: carouselUrls,
                defenderDescription: formData.defDescription || null,
                defenderAudioEvidence: defAudioUrl,
                defenderCarouselEvidence: defCarouselUrls,
                created_at: new Date().toISOString(),
            };

            const success = await createDispute(
                formData.defenderAddress,
                formData.claimerAddress || undefined,
                formData.category,
                disputePayload,
                formData.jurorsRequired,
                formData.deadlineHours,
            );

            if (success) {
                await queryClient.invalidateQueries({ queryKey: ["disputeCount"] });
                router.push("/profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload evidence.");
        } finally {
            setIsUploading(false);
        }
    };

    const isProcessing = isCreating || isUploading;

    return {
        formData,
        files,
        setFiles,
        updateField,
        submit,
        isProcessing,
    };
};
