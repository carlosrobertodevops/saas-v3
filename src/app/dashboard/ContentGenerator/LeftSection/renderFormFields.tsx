// Traduções
import { useTranslations } from "next-intl";

import MainTopic from "./MainTopic";
import ToneOrStyle from "./ToneOrStyle";
import Audience from "./Audience";
import LanguageSelector from "@/src/components/LanguageSelector";
import Keywords from "@/src/components//Keywords";
import { useAppContext } from "@/src/app/AppContext";

export const RenderFormFields = () => {
  const {
    selectedTemplatesObject: { selectedTemplate },
  } = useAppContext();
  const t = useTranslations("prompts");
  switch (selectedTemplate?.title) {
    case "Post Title":
      return (
        <>
          <MainTopic
            label={t("blog_topic_label")}
            placeholder={t("blog_topic_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "Blog Tags":
      return (
        <>
          <MainTopic
            label={t("blog_tag_label")}
            placeholder={t("blog_tag_placeholder")}
          />
          <Audience />
        </>
      );
    case "Youtube Hashtags":
      return (
        <>
          <MainTopic
            label={t("video_topic_label")}
            placeholder={t("video_topic_placeholder")}
          />
          <Audience />
        </>
      );
    case "Code Generator":
      return (
        <>
          <MainTopic
            label={t("programming_task_label")}
            placeholder={t("programming_task_placeholder")}
          />
          <LanguageSelector />
        </>
      );
    case "Email Newsletter":
      return (
        <>
          <MainTopic
            label={t("newsletter_topic_label")}
            placeholder={t("newsletter_placeholder")}
          />
          <Audience />
          <ToneOrStyle />
        </>
      );
    case "Question & Answer":
      return (
        <>
          <MainTopic
            label={t("main_question_label")}
            placeholder={t("main_question_placeholder")}
          />
          <ToneOrStyle />
          <Audience />
        </>
      );
    case "Text Summarizer":
      return (
        <>
          <MainTopic
            label={t("text_summarize_label")}
            placeholder={t("text_summarize_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "Content Rewriter":
      return (
        <>
          <MainTopic
            label={t("content_rewrite_label")}
            placeholder={t("content_rewrite_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "Product Description":
      return (
        <>
          <MainTopic
            label={t("product_name_label")}
            placeholder={t("product_name_placeholder")}
          />
          {/* <ProductFeatures /> */}
          <ToneOrStyle />
        </>
      );
    case "Facebook Ads":
      return (
        <>
          <MainTopic
            label={t("ad_content_label")}
            placeholder={t("ad_content_placeholder")}
          />
          <Audience />
          <ToneOrStyle />
        </>
      );
    case "Blog Section":
      return (
        <>
          <MainTopic
            label={t("section_topic_label")}
            placeholder={t("section_topic_placeholder")}
          />
          <ToneOrStyle />
        </>
      );
    case "SEO Meta Description":
      return (
        <>
          <MainTopic
            label={t("page_content_label")}
            placeholder={t("page_content_placeholder")}
          />
          <Keywords />
        </>
      );
    case "LinkedIn Bio":
      return (
        <>
          <MainTopic
            label={t("your_profession_label")}
            placeholder={t("your_profession_placeholder")}
          />
          {/* <CareerAchievements /> */}
        </>
      );
    case "Instagram Captions":
      return (
        <>
          <MainTopic
            label={t("instagram_captions_label")}
            placeholder={t("instagram_captions_placeholder")}
          />
          <ToneOrStyle />
          {/* <Hashtags /> */}
        </>
      );
    default:
      return (
        <>
          <MainTopic
            label={t("blog_topic_label")}
            placeholder={t("blog_topic_placeholder")}
          />
          <ToneOrStyle />
          <Audience />
        </>
      );
  }
};
