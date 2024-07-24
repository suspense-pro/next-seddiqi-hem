import fetchPageData, { FetchPageDataInput } from "./fetchPageData";
import { GetServerSidePropsContext } from "next";
import fetchContent, { CmsRequest } from "../fetchContent";
import { findInContentMap } from "../helpers/findInContentMap";
import { FetchMapInput } from "../helpers/fetchMap";
import { CmsHierarchyNode, CmsHierarchyRequest } from "../utils";
import { findInHierarchy } from "../helpers/findInHierarchy";

async function fetchStandardPageData<
  CT extends FetchMapInput<CmsRequest>,
  CH extends FetchMapInput<CmsHierarchyRequest>
>(input: FetchPageDataInput<CT, CH>, context: GetServerSidePropsContext) {
  // console.log("input---", input)
  const data = await fetchPageData(
    {
      ...input,
      content: {
        ...input.content,
        // configComponents: { key: "config/components" }, //will change when structure of components in Amplience is final
      },
      hierarchies: {
        ...input.hierarchies,
        pages: [
          {
            tree: {
              key: "headerNavigation", //change to new delivery key from SANDBOX
            },
          },
          {
            tree: {
              key: "footerNavigation", //change to new delivery key from SANDBOX
            },
          }
        ],
      },
    },
    context
  );

  const pageNode = findInHierarchy(
    (data.hierarchies as any).pages[0],
    (node: CmsHierarchyNode) => {
      const dk =
        context.req.url === "/" ? "headerNavigation" : context.req.url?.slice(1);
      return node.content?._meta?.deliveryKey === dk;
    }
  );

  let page: any = {};

  if (
    pageNode &&
    pageNode.content._meta?.schema?.indexOf(
      "https://seddiqi.amplience.com/rendering/"
    ) === 0
  ) {
    const pageId = pageNode.content._meta.deliveryId;
    let fullPageContent = findInContentMap(
      data.content,
      (content) => content._meta.deliveryId === pageId
    );

    if (!fullPageContent) {
      [fullPageContent] = await fetchContent(
        [{ id: pageNode.content._meta.deliveryId }],
        data.context.cmsContext
      );
    }

    page = {
      page: fullPageContent,
      children: pageNode.children,
    };
  }

  return {
    ...data,
    page,
  };
}

export default fetchStandardPageData;
