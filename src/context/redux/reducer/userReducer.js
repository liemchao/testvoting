import * as PathAction from "../PathAction";
const initialState = {
  currentUser: [],
  form: [],
  campaigns: [],
  campaignsadmin: [],
  history: [],
  candidate: [],
  campaignStage: [],
  campaignStageNew: [],
  candidateList: [],
  question: [],
  campainOwner: [],
  category: [],
  type: [],
  formByid: {},
  stageByid: {},
  campaignById: [],
  getcampaignById: {},
  profile: {},
  useToAddCandidate: [],
  idForm: "",
  idStage: "",
  nameButton: "",
  formUserByIdUser: [],
  listGroup: [],
  listscore: [],
  feeback: [],
  feebackuser: [],
  liststageScore: [],
  listRatio: [],
  listIdArray: undefined,
  idCampaign: undefined,
  checkvoter: true,
  checkfeeback: true,
  account: [],
  campaignOne: {},
  candidateOne: {},
  candidateonedetail: {},
  feedback: [],
  accountvoter: [],
  feedbackcampaign: [],
  thongKe: [],
  candidateId: "",
  activy: [],
  statistical: {},
  design: {},
  designsetting: {},
  designhome: {},
  voterOfVoter: [],
  statisticalCandidate: [],
  detailQuestion: {},
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PathAction.LOGIN_USER:
      state.currentUser = payload;
      break;
    case PathAction.GET_LIST_FORM:
      state.form = payload;
      break;
    case PathAction.GET_LIST_CAMPAIGNS:
      state.campaigns = payload;
      break;
    case PathAction.GET_LIST_HISTORY:
      state.history = payload;
      break;
    case PathAction.GET_LIST_CANDIDATE:
      state.candidate = payload;
      break;
    case PathAction.GET_LIST_CAMPAINGSTAGEID:
      state.campaignStage = payload;
      break;
    case PathAction.GET_LIST_CANDIDATE_CAMPAIGN:
      state.candidateList = payload;
      break;
    case PathAction.GET_LIST_QUESTIONS:
      state.question = payload;
      break;
    case PathAction.GET_CAMPAIGN_OWNER:
      state.campainOwner = payload;
      break;
    case PathAction.GET_CATEGORY:
      state.category = payload;
      break;
    case PathAction.GET_TYPE:
      state.type = payload;
      break;
    case PathAction.GET_FORM_BY_ID:
      state.formByid = payload;
      break;
    case PathAction.GET_CAMPAIGN_BY_ID:
      state.campaignById = payload;
      break;
    case PathAction.GET_LIST_CANDIDATE_ACCOUNT:
      state.useToAddCandidate = payload;
      break;
    case PathAction.GET_CAMPAIGN_ID:
      state.getcampaignById = payload;
      break;
    case PathAction.PUT_ID_FORM:
      state.idForm = payload;
      break;
    case PathAction.GET_FORM_BY_ID_USER:
      state.formUserByIdUser = payload;
      break;
    case PathAction.GET_LIST_GROUP:
      state.listGroup = payload;
      break;
    case PathAction.PUT_ID_STAGE:
      state.idStage = payload;
      break;
    case PathAction.PUT_NAME_BUTTON:
      state.nameButton = payload;
      break;
    case PathAction.GET_LIST_NEW_CAMPAINGSTAGEID:
      state.campaignStageNew = payload;
      break;
    case PathAction.GET_LIST_SCORE:
      state.listscore = payload;
      break;
    case PathAction.GET_LIST_RATIO:
      state.listRatio = payload;
      break;
    case PathAction.GET_LIST_SCORE_STAGE:
      state.liststageScore = payload;
      break;
    case PathAction.PUT_ID_ARRAY:
      state.listIdArray = payload;
      break;
    case PathAction.CHECK_VOTER:
      state.checkvoter = payload;
      break;
    case PathAction.PUT_ID_CAMPAIGN:
      state.idCampaign = payload;
      break;
    case PathAction.GET_STAGE_BY_ID:
      state.stageByid = payload;
      break;
    case PathAction.GET_ACCOUNT:
      state.account = payload;
      break;
    case PathAction.GET_PROFILE:
      state.profile = payload;
      break;
    case PathAction.GET_LIST_CAMPAIGNS_ONE:
      state.campaignOne = payload;
      break;

    case PathAction.GET_LIST_FEEDBACK:
      state.feedback = payload;
      break;
    case PathAction.GET_LIST_THONGKE:
      state.thongKe = payload;

    case PathAction.GET_FEEDBACK:
      state.feeback = payload;
      break;
    case PathAction.GET_CANDIDATE_ID:
      state.candidateId = payload;
      break;

    case PathAction.GET_ACTIVITY:
      state.activy = payload;
      break;

    case PathAction.GET_DETAIL_CANDIDATE:
      state.candidateOne = payload;

      break;

    case PathAction.GET_DETAIL_ONE_CANDIDATE:
      state.candidateonedetail = payload;
      break;
    case PathAction.GET_STATISTICAL:
      state.statistical = payload;
      break;
    case PathAction.GET_GROUP_OF_VOTER:
      state.groupOfVoter = payload;
      break;
    case PathAction.GET_STATISTICAL_CANDIDATES_ID:
      state.statisticalCandidate = payload;
      break;
    case PathAction.GET_RESULTS:
      state.results = payload;
      break;
    case PathAction.GET_DETAIL_QUESTION:
      state.detailQuestion = payload;
      break;
    case PathAction.GET_LIST_USER_FEEDBACK:
      state.feebackuser = payload;
      break;
    case PathAction.GET_LIST_CAMPAIGN_FEEDBACK:
      state.feedbackcampaign = payload;
      break;
    case PathAction.GET_LIST_CAMPAIGNS_ADMIN:
      state.campaignsadmin = payload;
      break;
    case PathAction.CHECK_FEEDBACK:
      state.checkfeeback = payload;
      break;
    case PathAction.GET_LIST_ACCOUNT_THONGKE:
      state.accountvoter = payload;
      break;
    case PathAction.GET_DESGN:
      state.design = payload;
      break;
    case PathAction.GET_SETTING_DESGN:
      state.designsetting = payload;
      break;
    case PathAction.GET_DESGN_HOME:
      state.designhome = payload;
      break;
    default:
      return { ...state };
  }
  return { ...state };
}
